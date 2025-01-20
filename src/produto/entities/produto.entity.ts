import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/NumericTransformer";
import { ItemPedidos } from "../../item_compra/entities/item_pedido.entity";
import { Estoque } from "../../estoque/entities/estoque.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { ManyToOne } from "typeorm";

@Entity({name:"tb_produtos"})
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    titulo: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
    categoria: Categoria;

    @Transform(({ value } : TransformFnParams) => value?.trim)
    @IsNotEmpty()
    @Column({length:5000, nullable: false})
    descricao: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number;

    @Column({ nullable: true }) 
    imagem: string;

    @OneToMany(() => ItemPedidos, (itemPedidos) => itemPedidos.produto)
    itens: ItemPedidos[];

    @OneToMany(() => Estoque, (estoque) => estoque.produto)
    estoques: Estoque[];

}

