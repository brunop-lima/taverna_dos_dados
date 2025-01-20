import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estoque } from "./entities/estoque.entity";
import { EstoqueController } from "./controllers/estoque.controller";
import { EstoqueService } from "./services/estoque.service";
import { ProdutoModule } from "../produto/produto.module";
import { FornecedorModule } from "../fornecedor/fornecedor.module";

@Module({
    imports: [TypeOrmModule.forFeature([Estoque]), forwardRef(() => ProdutoModule), FornecedorModule],
    controllers:[EstoqueController],
    providers: [EstoqueService],
    exports:[TypeOrmModule]
})
export class EstoqueModule {}