import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({name:"tb_categoria"})
export class Categoria{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    nome: string;

    @Transform(({ value } : TransformFnParams) => value?.trim)
    @IsNotEmpty()
    @Column({length:5000, nullable: false})
    descricao: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[];

}