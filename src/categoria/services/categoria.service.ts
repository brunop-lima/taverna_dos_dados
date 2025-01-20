import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CategoariaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async findById (id: number): Promise<Categoria>{
        const categoria = await this.categoriaRepository.findOne({
            where: {id}
        })

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)

        return categoria;
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
      }

    async update(categoria: Categoria): Promise<Categoria> {
        const existingCategoria = await this.findById(categoria.id);
    
        if (!existingCategoria) {
          throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND);
        }
    
        return await this.categoriaRepository.save(categoria);
      }

    async delete(id: number): Promise<DeleteResult> {
        const categoria = await this.findById(id);
    
        if (!categoria) {
          throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND);
        }
    
        return await this.categoriaRepository.delete(id);
      }
    }
