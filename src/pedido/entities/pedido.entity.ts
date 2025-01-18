import { OneToMany } from "typeorm";
import { ItemPedidos } from "./item-pedidos.entity"; 

@Entity({ name: "tb_pedidos" })
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ItemPedidos, (itemPedidos) => itemPedidos.pedido)
    itens: ItemPedidos[];

    @Column("decimal", { nullable: true })
    valorTotal: number;

    @Column({ nullable: true })
    quantidadeItens: number;

    calcularResumoPedido() {
        this.valorTotal = this.itens.reduce((total, item) => total + item.valorTotal, 0);
        this.quantidadeItens = this.itens.reduce((total, item) => total + item.quantidade, 0);
    }
}
