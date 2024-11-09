import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterUpdate,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { UserData } from '../userData.model';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User implements UserData {
  constructor(data: Partial<UserData>) {
    Object.assign(this, data);
    this.id = data.id ?? uuidv4();
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version = 1;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @BeforeInsert()
  private setDates() {
    this.createdAt = Date.now();
  }

  @BeforeUpdate()
  private updateTimestampBefore() {
    this.updatedAt = Date.now();
  }

  @AfterUpdate()
  private logUpdate() {
    console.log(`User with ID ${this.id} was updated at ${this.updatedAt}`);
  }

  omitPassword(): Omit<UserData, 'password'> {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
