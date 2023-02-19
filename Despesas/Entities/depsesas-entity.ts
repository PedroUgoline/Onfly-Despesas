//
// Não usei banco de dados, porém se tivesse utilizado, ficaria assim a entidade.
//
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

import { Users } from './user-entity'

@Entity('despesas')
export class Despesas extends BaseEntity {
    constructor(init?: Partial<Despesas>) {
        super();
        Object.assign(this, init);
    }
    @ObjectIdColumn()
    id: string;

    @Column({name: 'description'})
    description: string;

    @Column({name: 'userId'})
    userId: Users

    @Column({name: 'date'})
    date: Date;

    @Column({name: 'value'})
    value: number;
}