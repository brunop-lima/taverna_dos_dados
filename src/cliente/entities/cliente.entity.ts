import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsEmail, MinLength, Matches  } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Pedido } from "../../pedido/entities/pedido.entity";

@Entity({name:"tb_clientes"})
export class Cliente{

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

    @IsNotEmpty()
    @MinLength(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    @Matches(/(?=.*[A-Z])/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    @Matches(/(?=.*[a-z])/, { message: "A senha deve conter pelo menos uma letra minúscula." })
    @Matches(/(?=.*\d)/, { message: "A senha deve conter pelo menos um número." })
    @Matches(/(?=.*[@$!%*?&])/, { message: "A senha deve conter pelo menos um caractere especial." })
    @Column({ nullable: false })
    senha: string;

    @UpdateDateColumn()
    data: Date;

    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[];
    
}