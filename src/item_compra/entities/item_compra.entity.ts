import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tb_itens_pedidos"})
export class ItemPedido{

    @PrimaryGeneratedColumn()
    id: number

}