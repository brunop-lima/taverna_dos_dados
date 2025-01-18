import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature[(ItemPedido)]],
    controllers:[],
    proviiders:[],
    exports:[TypeOrmModule],
})
export class ItemPedidoModule {}