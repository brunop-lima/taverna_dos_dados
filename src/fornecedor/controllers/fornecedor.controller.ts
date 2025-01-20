import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { FornecedorService } from "../services/fornecedor.service";
import { Fornecedor } from "../entities/fornecedor.entity";

@Controller("/fornecedores")
export class FornecedorController {

  constructor(
    private readonly fornecedorService: FornecedorService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Fornecedor[]> {
    return this.fornecedorService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Fornecedor> {
    return this.fornecedorService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.fornecedorService.create(fornecedor);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.fornecedorService.update(fornecedor);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.fornecedorService.delete(id).then(() => undefined);
  }
}
