import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { Pedido } from "./entities/pedido.entity";
import { PedidoController } from "./controllers/pedido.controller";
import { PedidoService } from "./services/pedido.service";
import { ItemPedidosModule } from "../item_compra/item_pedido.module";
import { ClienteModule } from "../cliente/cliente.module";

@Module({
    imports: [TypeOrmModule.forFeature([Pedido]), forwardRef(() => ItemPedidosModule ), forwardRef(() => ClienteModule)],
    controllers: [PedidoController],
    providers: [PedidoService],
    exports: [TypeOrmModule, PedidoService],
})
export class PedidoModule {}