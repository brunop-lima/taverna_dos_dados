import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { EstoqueService } from "../services/estoque.service";
import { Estoque } from "../entities/estoque.entity";
  
  @Controller("/estoques")
  export class EstoqueController {
  
    constructor(
      private readonly estoqueService: EstoqueService
    ) {}
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Estoque[]> {
      return this.estoqueService.findAll();
    }
  
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Estoque> {
      return this.estoqueService.findById(id);
    }
  
    @Get('/fornecedor/:fornecedorId')
    @HttpCode(HttpStatus.OK)
    findByFornecedor(@Param('fornecedorId', ParseIntPipe) fornecedorId: number): Promise<Estoque[]> {
      return this.estoqueService.findByFornecedor(fornecedorId);
    }
  
    @Get('/produto/:produtoId')
    @HttpCode(HttpStatus.OK)
    findByProduto(@Param('produtoId', ParseIntPipe) produtoId: number): Promise<Estoque[]> {
      return this.estoqueService.findByProduto(produtoId);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() estoque: Estoque): Promise<Estoque> {
      return this.estoqueService.create(estoque);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() estoque: Estoque): Promise<Estoque> {
      return this.estoqueService.update(estoque);
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.estoqueService.delete(id).then(() => undefined);
    }
  }
  