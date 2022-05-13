import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ItemEntity } from '@item/item.entity';
import { UserEntity } from '@user/user.entity';

@Entity('list')
export class ListEntity { 
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) title: string;

    @OneToMany(() => ItemEntity, item => item.list) items?: ItemEntity[];

    @ManyToOne(() => UserEntity) owner?: UserEntity;
}
