import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./entities/cliente.entity";
import { ClienteController } from "./controllers/cliente.controller";
import { ClienteService } from "./services/cliente.service";
import { PedidoModule } from "../pedido/pedido.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cliente]), PedidoModule ],
    controllers:[ClienteController],
    providers: [ClienteService],
    exports:[TypeOrmModule, ClienteService],
})
export class ClienteModule {}