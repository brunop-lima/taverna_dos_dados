import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Produto } from "./produto.entity"; // Ajuste conforme o caminho correto
import { Pedido } from "./pedido.entity"; // Ajuste conforme o caminho correto

@Entity({ name: "tb_itens_pedidos" })
export class ItemPedidos {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Produto, (produto) => produto.itens)
    produto: Produto;

    @ManyToOne(() => Pedido, (pedido) => pedido.itens)
    pedido: Pedido;

    @Column()
    quantidade: number;

    @Column("decimal")
    valorUnitario: number;

    @Column("decimal")
    valorTotal: number;

    calcularValorTotal() {
        this.valorTotal = this.quantidade * this.valorUnitario;
    }
}
