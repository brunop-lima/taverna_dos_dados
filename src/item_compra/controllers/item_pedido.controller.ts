import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ItemPedidos } from "../entities/item_pedido.entity";
import { ItemPedidoService } from "../services/item_pedido.service";
  
  @Controller("/itens-pedidos")
  export class ItemPedidoController {
  
    constructor(
      private readonly itemPedidoService: ItemPedidoService
    ) {}
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<ItemPedidos[]> {
      return this.itemPedidoService.findAll();
    }
  
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<ItemPedidos> {
      return this.itemPedidoService.findById(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() itemPedido: ItemPedidos): Promise<ItemPedidos> {
      return this.itemPedidoService.create(itemPedido);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() itemPedido: ItemPedidos): Promise<ItemPedidos> {
      return this.itemPedidoService.update(itemPedido);
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.itemPedidoService.delete(id).then(() => undefined);
    }
  }
  