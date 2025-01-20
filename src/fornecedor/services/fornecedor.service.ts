import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fornecedor } from "../entities/fornecedor.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class FornecedorService{

    constructor(
        @InjectRepository(Fornecedor)
        private fornecedorRepository: Repository<Fornecedor>
    ){}

    async findAll(): Promise<Fornecedor[]>{
        return this.fornecedorRepository.find({

        })
    }

    async findById(id: number): Promise<Fornecedor>{
        const fornecedor = await this.fornecedorRepository.findOne({
            where:{id}
        })

        if (!fornecedor)
            throw new HttpException('Fornecedor não encontrado', HttpStatus.NOT_FOUND)

        return fornecedor
    }

    async create(fornecedor: Fornecedor): Promise<Fornecedor>{
    return await this.fornecedorRepository.save(fornecedor);
}

    async update(fornecedor: Fornecedor): Promise<Fornecedor>{
        await this.findById(fornecedor.id)
        return await this.fornecedorRepository.save(fornecedor);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.fornecedorRepository.delete(id)
    }
    
}