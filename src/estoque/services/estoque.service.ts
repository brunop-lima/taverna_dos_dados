import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Estoque } from "../entities/estoque.entity";
import { DeleteResult, Repository } from "typeorm";
import { FornecedorService } from "../../fornecedor/services/fornecedor.service";
import { ProdutoService } from "../../produto/services/produto.service";

@Injectable()
export class EstoqueService{

    constructor(
        @InjectRepository(Estoque)
        private estoqueRepository: Repository<Estoque>,
        private fornecedorService: FornecedorService,
        private produtoService: ProdutoService
    ){}

    async findAll(): Promise<Estoque[]>{
        return this.estoqueRepository.find({
            relations:{
                fornecedor: true
            }
        });
    }

    async findById(id: number): Promise<Estoque>{
        const estoque = await this.estoqueRepository.findOne({
            where: {id},
            relations:{fornecedor: true}
        })

        if(!estoque)
        throw new HttpException('Cadastro de estoque não encontrado!', HttpStatus.NOT_FOUND)

        return estoque;
    }

    async findByFornecedor(fornecedorId: number): Promise<Estoque[]> {
        const fornecedor = await this.fornecedorService.findById(fornecedorId);
    
        const estoques = await this.estoqueRepository.find({
            where: {
                fornecedor: fornecedor,
            },
            relations: {
                fornecedor: true,
            },
        });
    
        if (!estoques || estoques.length === 0) {
            throw new HttpException(
                'Nenhum estoque encontrado para o fornecedor especificado!',
                HttpStatus.NOT_FOUND,
            );
        }
    
        return estoques;
    }

    async findByProduto(produtoId: number): Promise<Estoque[]> {
        const estoques = await this.estoqueRepository.find({
            where: {
                produto: { id: produtoId },
            },
            relations: {
                fornecedor: true,
                produto: true,
            },
        });

        if (!estoques || estoques.length === 0) {
            throw new HttpException(
                "Nenhum estoque encontrado para o produto especificado!",
                HttpStatus.NOT_FOUND
            );
        }

        return estoques;
    }    

    async create(estoque: Estoque): Promise<Estoque>{
        await this.fornecedorService.findById(estoque.fornecedor.id)
        return await this.estoqueRepository.save(estoque)
    }

    async update(estoque: Estoque): Promise<Estoque>{
        await this.findById(estoque.id)
        await this.fornecedorService.findById(estoque.fornecedor.id)
        return await this.estoqueRepository.save(estoque)
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.estoqueRepository.delete(id)
    }

}