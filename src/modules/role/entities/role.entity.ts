import { TimestampedEntity } from '@/common/entities';
import { User } from '@/modules/user/entities';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'role' })
@Unique(['roleName'])
export class Role extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Index('index_role_name')
  @Column({ name: 'role_name', type: 'varchar' })
  readonly roleName: string;

  @OneToMany(() => User, (user) => user.role)
  readonly users: User[];

  @Column({ name: 'role_describe', type: 'varchar', length: 255 })
  readonly roleDescribe: string;
}
