import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn,
    Entity 
} from 'typeorm';

@Entity()
export class ProductsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @Column('jsonb')
    attributes: any;

    @Column()
    desc: string;

    @Column({default: 0})
    discount: number;

    @Column({default: 0})
    quantity: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;
    
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
}