import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { IsNumber, IsPositive } from "class-validator";
import { ItemPedidos } from "../../item_compra/entities/item_pedido.entity";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { ManyToOne } from "typeorm";

@Entity({ name: "tb_pedidos" })
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    cliente: Cliente;

    @OneToMany(() => ItemPedidos, (itemPedidos) => itemPedidos.pedido, { cascade: true, eager: true })
    itens: ItemPedidos[];

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    valorTotal: number;

    @IsNumber()
    @IsPositive()
    @Column({ type: "int", nullable: true })
    quantidadeItens: number;

    calcularResumoPedido(): void {
        this.valorTotal = this.itens?.reduce((total, item) => total + item.valorTotal, 0) || 0;
        this.quantidadeItens = this.itens?.reduce((total, item) => total + item.quantidade, 0) || 0;
    }
}
