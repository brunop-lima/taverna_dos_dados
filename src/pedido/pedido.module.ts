import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Pedido } from "./entities/pedido.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Pedido])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule],
})
export class PedidoModule {}