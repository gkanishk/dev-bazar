import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn 
} from 'typeorm';

export abstract class ProductsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'string'})
    name: string;

    @Column({ type: 'string' })
    category: string;

    @Column()
    price: number;

    @Column({type: 'jsonb'})
    attributes: any;

    @Column({type: 'string'})
    desc: string;

    @Column({type: 'number', default: 0})
    discount: number;

    @Column({type: 'number', default: 0})
    quantity: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
}