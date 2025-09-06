import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Annonce } from 'src/annonces/annonce.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  password_hash: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  num_tel: number;

  // Relation avec annonces
  @OneToMany(() => Annonce, (annonce) => annonce.user)
  annonces: Annonce[];
}
