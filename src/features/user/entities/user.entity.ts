import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { UserData } from '../userData.model';
@Entity()
export class User implements UserData {
  constructor(data?: Partial<UserData>) {
    if (data && data.login) {
      this.login = data.login;
    }
    if (data && data.password) {
      this.password = data.password;
    }
    if (data && data.updatedAt) {
      this.updatedAt = data.updatedAt;
    }
    if (data && data.version) {
      this.version = data.version;
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  showVersion() {
    console.log('version', this.version);
  }

  updateVersion() {
    this.version = +this.version + 1;
    this.updatedAt = +new Date();
  }
  @BeforeInsert()
  setTimestamps() {
    const timestamp = Date.now();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
    this.version = 1;
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
