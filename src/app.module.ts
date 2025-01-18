import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { Cliente } from './cliente/entities/cliente.entity';
import { Estoque } from './estoque/entities/estoque.entity';
import { Fornecedor } from './fornecedor/entities/fornecedor.entity';
import { ItemPedidos } from './item_compra/entities/item_pedido.entity';
import { Pedido } from './pedido/entities/pedido.entity';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ClienteModule } from './cliente/cliente.module';
import { EstoqueModule } from './estoque/estoque.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ItemPedidosModule } from './item_compra/item_pedido.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_taverna_dos_dados',
      entities: [Produto, Categoria, Cliente, Estoque, Fornecedor, ItemPedidos, Pedido],
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    CategoriaModule,
    ClienteModule,
    EstoqueModule,
    FornecedorModule,
    ItemPedidosModule,
    PedidoModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
