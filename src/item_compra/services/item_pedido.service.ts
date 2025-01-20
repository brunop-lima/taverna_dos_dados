import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemPedidos } from "../entities/item_pedido.entity";
import { DeleteResult, Repository } from "typeorm";
import { ProdutoService } from "../../produto/services/produto.service";


@Injectable()
export class ItemPedidoService{
    constructor(
        @InjectRepository(ItemPedidos)
        private itemPedidoRepository: Repository<ItemPedidos>,
        private produtoService: ProdutoService
    ){}

    async findAll(): Promise<ItemPedidos[]> {
        return await this.itemPedidoRepository.find({
          relations: {produto: true,},
        });
      }

    async findById(id: number): Promise<ItemPedidos> {
        const item_pedido = await this.itemPedidoRepository.findOne({
          where: { id },
          relations: {produto: true}
        });
    
        if (!item_pedido) {
          throw new HttpException("Item não encontrado!", HttpStatus.NOT_FOUND);
        }
    
        return item_pedido;
      }
    

      async create(item_pedido: ItemPedidos): Promise<ItemPedidos> {
          if (!item_pedido.produto || !item_pedido.produto.id) {
            throw new HttpException("Produto deve ser especificada!", HttpStatus.BAD_REQUEST);
          }
          await this.produtoService.findById(item_pedido.produto.id);
          return await this.itemPedidoRepository.save(item_pedido);
        }
        
        async update(item_pedido: ItemPedidos): Promise<ItemPedidos> {
          await this.findById(item_pedido.id);
          if (item_pedido.produto && item_pedido.produto.id) {
            await this.itemPedidoRepository.findOne({
              where: { produto: { id: item_pedido.produto.id } } });
          }
      
          return await this.itemPedidoRepository.save(item_pedido);
        }
      
        async delete(id: number): Promise<DeleteResult> {
          const item_pedido = await this.findById(id);
          if (!item_pedido) {
            throw new HttpException("Item não encontrado!", HttpStatus.NOT_FOUND);
          }
          return await this.itemPedidoRepository.delete(id);
        }
      
}