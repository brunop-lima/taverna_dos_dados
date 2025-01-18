import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tb_estoque"})
export class Estoque{

    @PrimaryGeneratedColumn()
    id: number;

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