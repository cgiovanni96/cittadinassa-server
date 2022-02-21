import { Column } from 'typeorm';

export class ExtraInfo {
  @Column({ nullable: true })
  drive: string;

  @Column({ nullable: true })
  discord: string;
}
