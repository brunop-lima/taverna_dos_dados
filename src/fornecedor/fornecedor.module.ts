import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fornecedor } from "./entities/fornecedor.entity";
import { FornecedorController } from "./controllers/fornecedor.controller";
import { FornecedorService } from "./services/fornecedor.service";

@Module({

    imports: [TypeOrmModule.forFeature([Fornecedor])],
    controllers: [FornecedorController],
    providers: [FornecedorService],
    exports: [TypeOrmModule, FornecedorService],
})
export class FornecedorModule{}