import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { Estoque } from "../../estoque/entities/estoque.entity";

@Entity({name:"tb_fornecedores"})
export class Fornecedor{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    nome: string;

    @Transform(({ value } : TransformFnParams) => value?.trim)
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    endereco: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail({}, { message: "O email deve ser válido." })
    @Column({ length: 150, nullable: false, unique: true })
    email: string;

    @UpdateDateColumn()
    data: Date;

    @OneToMany(() => Estoque, (estoque) => estoque.fornecedor)
    estoques: Estoque[];

}