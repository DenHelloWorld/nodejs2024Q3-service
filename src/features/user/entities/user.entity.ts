import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserData } from '../userData.model';
import { v4 as uuidv4 } from 'uuid';
import { IsInt } from 'class-validator';

@Entity()
export class User implements UserData {
  constructor(data?: Partial<UserData>) {
    if (data) {
      Object.assign(this, data);
      this.id = data.id ?? uuidv4();
      this.version = data.version ?? 1;
      this.updatedAt = data.updatedAt ?? +new Date();
      this.createdAt = data.createdAt ?? +new Date();
    } else {
      this.id = uuidv4();
      this.version = 1;
      this.updatedAt = +new Date();
      this.createdAt = +new Date();
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @IsInt()
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;

  showVersion() {
    console.log('version', this.version);
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
