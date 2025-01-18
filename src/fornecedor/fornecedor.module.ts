import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fornecedor } from "./entities/fornecedor.entity";

@Module({

    imports: [TypeOrmModule.forFeature([Fornecedor])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class FornecedorModule{}