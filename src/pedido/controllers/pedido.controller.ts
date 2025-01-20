import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PedidoService } from "../services/pedido.service";
import { Pedido } from "../entities/pedido.entity";
  
  @Controller("/pedidos")
  export class PedidoController {
  
    constructor(
      private readonly pedidoService: PedidoService
    ) {}
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Pedido[]> {
      return this.pedidoService.findAll();
    }
  
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
      return this.pedidoService.findById(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() pedido: Pedido): Promise<Pedido> {
      return this.pedidoService.create(pedido);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() pedido: Pedido): Promise<Pedido> {
      return this.pedidoService.update(pedido);
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.pedidoService.delete(id).then(() => undefined);
    }
  }
  