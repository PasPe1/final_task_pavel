import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ 
    type: 'varchar' 
  })
  public password!: string;

  @Column({ 
    type: 'varchar', nullable: true 
  })
  public nick_name: string | null;

  @Column({ 
    type: 'timestamp', nullable: true, default: null 
  })
  public lastLoginAt: Date | null;

  @Column({
      nullable: false,
      default: '',
  })
  first_name: string;

  @Column({
      nullable: false,
      default: '',
  })
  last_name: string;

  @Column({
      nullable: false,
      default: '',
  })
  phone_number: string; 

  @Column({
      nullable: false,
      default: '',
  })
  description: string;

  @Column({
      nullable: false,
      default: '',
  })
  position: string;

  @Column({
      nullable: false,
      default: 'https://galshir.com/img/brushes/gal-shir-brushes-before.jpg',
  })
  img: string;

  @Column({
    nullable: false
  })
  role: string;

}
