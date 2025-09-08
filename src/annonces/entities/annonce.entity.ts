import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('annonces')
export class Annonce {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  imagelink: string;

  @Column('float')
  prix: number;

  @Column()
  code_postal: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.annonces, { onDelete: 'CASCADE' })
  user: User;
}
