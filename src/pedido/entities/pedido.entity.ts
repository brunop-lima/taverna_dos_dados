import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tb_pedidos"})
export class Pedido{

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn
    data: Date
}