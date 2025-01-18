import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemPedidos } from "./entities/item_pedido.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ItemPedidos])],
    controllers:[],
    providers:[],
    exports:[TypeOrmModule],
})
export class ItemPedidosModule {}