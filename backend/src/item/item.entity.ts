import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ListEntity } from '@list/list.entity';

@Entity('item')
export class ItemEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) text: string;
    @Column({ type: 'boolean', default: false}) checked: boolean = false;
    @CreateDateColumn() createdOn?: Date;

    @ManyToOne(() => ListEntity, list => list.items, {
        onDelete: 'CASCADE',
    }) list?: ListEntity;
}
