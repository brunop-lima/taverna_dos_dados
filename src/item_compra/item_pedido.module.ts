import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemPedidos } from "./entities/item_pedido.entity";
import { ItemPedidoController } from "./controllers/item_pedido.controller";
import { ItemPedidoService } from "./services/item_pedido.service";
import { ProdutoModule } from "../produto/produto.module";
import { PedidoModule } from "../pedido/pedido.module";

@Module({
    imports: [TypeOrmModule.forFeature([ItemPedidos]), ProdutoModule ,  forwardRef(() => PedidoModule)],
    controllers:[ItemPedidoController],
    providers:[ItemPedidoService],
    exports:[TypeOrmModule,  ItemPedidoService],
})
export class ItemPedidosModule {}