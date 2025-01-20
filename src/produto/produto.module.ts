import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { forwardRef, Module } from "@nestjs/common";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";
import { CategoriaModule } from "../categoria/categoria.module";
import { EstoqueModule } from "../estoque/estoque.module";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule, forwardRef(() => EstoqueModule)],
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: [TypeOrmModule, ProdutoService]
})
export class ProdutoModule{}