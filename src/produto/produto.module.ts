import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
})
export class ProdutoModule{}