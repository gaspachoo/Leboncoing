import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Annonce } from 'src/annonces/entities/annonce.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Exclude()
  @Column()
  password_hash: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  num_tel: string;

  // Relation avec annonces
  @OneToMany(() => Annonce, (annonce) => annonce.user)
  annonces: Annonce[];
}
