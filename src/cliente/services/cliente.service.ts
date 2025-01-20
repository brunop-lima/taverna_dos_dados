import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { Cliente } from "../entities/cliente.entity";
import { PedidoService } from "../../pedido/services/pedido.service";

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private pedidoService: PedidoService
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: {
        pedidos: true},
    });
  }

  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: {
        pedidos: true},
    });

    if (!cliente) {
      throw new HttpException("Cliente não encontrado!", HttpStatus.NOT_FOUND);
    }

    return cliente;
  }

  async create(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.save(cliente);
  }

  async update(cliente: Cliente): Promise<Cliente> {
    const existingCliente = await this.findById(cliente.id);

    if (!existingCliente) {
      throw new HttpException("Cliente não encontrado!", HttpStatus.NOT_FOUND);
    }

    return await this.clienteRepository.save(cliente);
  }

  async delete(id: number): Promise<DeleteResult> {
    const cliente = await this.findById(id);

    if (!cliente) {
      throw new HttpException("Cliente não encontrado!", HttpStatus.NOT_FOUND);
    }

    for (const pedido of cliente.pedidos) {
      await this.pedidoService.delete(pedido.id);
    }

    return await this.clienteRepository.delete(id);
  }
}
