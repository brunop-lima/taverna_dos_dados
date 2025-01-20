import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Pedido } from "../entities/pedido.entity";
import { ItemPedidoService } from "../../item_compra/services/item_pedido.service";

@Injectable()
export class PedidoService{

    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: Repository<Pedido>,
        private itemPedidoService: ItemPedidoService
    ){}

    async findAll(): Promise<Pedido[]>{
        return this.pedidoRepository.find({
            relations:{itens: true}
        });
    }

    async findById(id: number): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findOne({
            where: { id  },
            relations:{itens: true}
        });

        if(!pedido)
            throw new HttpException('Pedido não encontrada!', HttpStatus.NOT_FOUND)

        return pedido;
    }

     async create(pedido: Pedido): Promise<Pedido> {
        for (const item of pedido.itens) {
            await this.itemPedidoService.findById(item.id);
          }

        pedido.calcularResumoPedido();
    
        return await this.pedidoRepository.save(pedido);
      }
    
      async update(pedido: Pedido): Promise<Pedido> {
        await this.findById(pedido.id);
    
        for (const item of pedido.itens) {
          await this.itemPedidoService.findById(item.id); // Validar cada item
        }

        pedido.calcularResumoPedido();

        return await this.pedidoRepository.save(pedido);
      }
    
      async delete(id: number): Promise<DeleteResult> {
        const pedido = await this.findById(id);
        if (!pedido) {
          throw new HttpException("Pedido não encontrado!", HttpStatus.NOT_FOUND);
        }
        return await this.pedidoRepository.delete(id);
      } 
}

