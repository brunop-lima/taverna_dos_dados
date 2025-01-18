import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { Pedido } from "../../pedido/entities/pedido.entity";

@Entity({ name: "tb_itens_pedidos" })
export class ItemPedidos {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Produto, (produto) => produto.itens, { nullable: false, onDelete: "CASCADE" })
    produto: Produto;

    @ManyToOne(() => Pedido, (pedido) => pedido.itens, { nullable: false, onDelete: "CASCADE" })
    pedido: Pedido;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "int", nullable: false })
    quantidade: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    valorUnitario: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    valorTotal: number;

    calcularValorTotal(): void {
        this.valorTotal = this.quantidade * this.valorUnitario;
    }
}
