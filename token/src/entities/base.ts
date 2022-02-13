import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';
@Entity()
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
