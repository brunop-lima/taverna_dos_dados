import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { Module } from "@nestjs/common";
import { PedidoController } from "../pedido/controllers/pedido.controller";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";
import { CategoriaModule } from "../categoria/categoria.module";
import { EstoqueModule } from "../estoque/estoque.module";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule, EstoqueModule],
    providers: [ProdutoController],
    controllers: [ProdutoService],
    exports: [TypeOrmModule, ProdutoService]
})
export class ProdutoModule{}