//
// Não usei banco de dados, porém se tivesse utilizado, ficaria assim a entidade.
//
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('users')
export class Users extends BaseEntity {
    constructor(init?: Partial<Users>) {
        super();
        Object.assign(this, init);
    }
    @ObjectIdColumn()
    id: string;

    @Column({name: 'user'})
    user: string;

    @Column({name: 'password'})
    password: string;s

    @Column({name: 'email'})
    email: string;
}