import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import { Report } from '../reports/report.entity';
//console.log(Report);

// import { Exclude } from 'class-transformer';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;


  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

@AfterInsert()
  logInsert() {
    console.log(`User has been inserted with id ${this.id}`);
  }

@AfterUpdate()
  logUpdate(){
    console.log('User has been updated with id : ' ,this.id)
  }


  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }

}
