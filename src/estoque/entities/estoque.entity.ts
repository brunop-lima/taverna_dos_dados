import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({name:"tb_estoque"})
export class Estoque{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() = > Produto, (produto) => produto.estoques, {onDelete:"CASCADE"})
    produto: Produto;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.estoques)
    fornecedor: Fornecedor;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantidade: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 1000, nullable: false})
    obs: string;

}