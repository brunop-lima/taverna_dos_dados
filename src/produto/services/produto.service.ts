import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
        estoques: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
        estoques: true,
      },
    });

    if (!produto) {
      throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async findByCategoria(categoriaId: number): Promise<Produto[]> {
    const categoria = await this.categoriaService.findById(categoriaId);
    const produtos = await this.produtoRepository.find({
      where: {categoria: categoria,},
      relations: {categoria: true,},
    });

    if (!produtos || produtos.length === 0) {
      throw new HttpException(
        "Nenhum produto encontrado para a categoria especificada!", HttpStatus.NOT_FOUND,);
    }

    return produtos;
  }

    async findByFornecedor(fornecedorId: number): Promise<Produto[]> {
      const produtos = await this.produtoRepository.find({
        where: {estoques: {fornecedor: { id: fornecedorId }},},relations: {estoques: true,},
      });
  
      if (!produtos.length) {
        throw new HttpException("Nenhum produto encontrado para o fornecedor especificado!", HttpStatus.NOT_FOUND);
      }
  
      return produtos;
    }

    async findByPrecoCrescente(): Promise<Produto[]> {
      return await this.produtoRepository.find({
        order: { preco: "ASC" },
        relations: {categoria: true, estoques: true},
      });
    }
    
    async findByPrecoDecrescente(): Promise<Produto[]> {
      return await this.produtoRepository.find({
        order: { preco: "DESC" },
        relations: {categoria: true, estoques: true},
      });
    }
    
    async findByIntervadoPreco(min: number, max: number): Promise<Produto[]> {
      const produtos = await this.produtoRepository.find({
        where: {
          preco: {
            $gte: min,
            $lte: max,
          },
        },
        relations: {categoria: true, estoques: true},
      });
    
      if (!produtos.length) {
        throw new HttpException("Nenhum produto encontrado dentro do intervalo especificado!",HttpStatus.NOT_FOUND,);
      }
    
      return produtos;
    }
    
    async findByTitulo(titulo: string): Promise<Produto[]> {
      const produtos = await this.produtoRepository.find({
        where: { titulo: ILike(`%${titulo}$%`)},
        relations: {categoria: true, estoques: true },
      });
    
      if (!produtos.length) {
        throw new HttpException("Nenhum produto encontrado com o título especificado!", HttpStatus.NOT_FOUND,);
      }
    
      return produtos;
    }
    
 
  async create(produto: Produto): Promise<Produto> {
    if (!produto.categoria || !produto.categoria.id) {
      throw new HttpException("Categoria do produto deve ser especificada!", HttpStatus.BAD_REQUEST,);
    }
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  
  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    if (produto.categoria && produto.categoria.id) {
      await this.categoriaService.findById(produto.categoria.id);
    }
    return await this.produtoRepository.save(produto);
  }
   async delete(id: number): Promise<DeleteResult> {
          const item_pedido = await this.findById(id);
          if (!item_pedido) {throw new HttpException("Item não encontrado!", HttpStatus.NOT_FOUND);}
          return await this.produtoRepository.delete(id);
        }

}