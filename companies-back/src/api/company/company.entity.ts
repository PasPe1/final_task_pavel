import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        nullable: false,
        default: 0,
    })
    profile_id: number;

    @Column({
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        nullable: false,
        default: '',
    })
    adress: string;

    @Column({
        nullable: false,
        default: '',
    })
    service: string;

    @Column({
        nullable: false,
        default: 0,
    })
    employeesCount: number;

    @Column({
        nullable: false,
        default: '',
    })
    description: string;

    @Column({
        nullable: false,
        default: '',
    })
    type: string;
}