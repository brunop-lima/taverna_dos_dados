import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
  
@Controller("/produtos")
export class ProdutoController {
  
  constructor(
  private readonly produtoService: ProdutoService
  ) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }
  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }
  
  @Get('/categoria/:categoriaId')
  @HttpCode(HttpStatus.OK)
  findByCategoria(@Param('categoriaId', ParseIntPipe) categoriaId: number): Promise<Produto[]> {
    return this.produtoService.findByCategoria(categoriaId);
  }
  
  @Get('/fornecedor/:fornecedorId')
  @HttpCode(HttpStatus.OK)
  findByFornecedor(@Param('fornecedorId', ParseIntPipe) fornecedorId: number): Promise<Produto[]> {
    return this.produtoService.findByFornecedor(fornecedorId);
  }

  @Get('/preco/crescente')
  @HttpCode(HttpStatus.OK)
  findByPrecoCrescente(): Promise<Produto[]> {
    return this.produtoService.findByPrecoCrescente();
  }

  @Get('/preco/decrescente')
  @HttpCode(HttpStatus.OK)
  findByPrecoDecrescente(): Promise<Produto[]> {
    return this.produtoService.findByPrecoDecrescente();
  }

  @Get('/preco/intervalo')
  @HttpCode(HttpStatus.OK)
  findByIntervaloPreco(
    @Query('min') min: number, 
    @Query('max') max: number
  ): Promise<Produto[]> {
    if (min === undefined || max === undefined) {
      throw new Error("Parâmetros 'min' e 'max' são obrigatórios!");
    }
    return this.produtoService.findByIntervadoPreco(min, max);
  }

  @Get('/titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Query('titulo') titulo: string): Promise<Produto[]> {
    if (!titulo) {
      throw new Error("Parâmetro 'titulo' é obrigatório!");
    }
    return this.produtoService.findByTitulo(titulo);
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }
  
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }
  
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produtoService.delete(id).then(() => undefined);
  }
  }
  