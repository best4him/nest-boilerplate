import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Thing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column('int')
    age: number;

}