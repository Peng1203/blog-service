import { TimestampedEntity } from '@/common/entities';
import { StatusEnum } from '@/helper/enums';
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'menu' })
@Unique(['menuName', 'menuPath'])
export class Menu extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Index('index_menu_name')
  @Column({ name: 'menu_name', type: 'varchar', length: 20 })
  readonly menuName: string;

  @Index('index_menu_path')
  @Column({ name: 'menu_path', type: 'varchar', length: 60 })
  readonly menuPath: string;

  @Column({ name: 'menu_icon', type: 'varchar', length: 20 })
  readonly menuIcon: string;

  @Column({ name: 'order_num', type: 'int', nullable: true })
  readonly orderNum: number;

  @Column({ name: 'parent_id', type: 'int', nullable: true, default: null })
  readonly parentId: number | null;

  @Column({ name: 'is_hidden', type: 'enum', enum: StatusEnum, default: StatusEnum.FALSE })
  readonly isHidden: StatusEnum;

  @Column({ name: 'is_keepAlive', type: 'enum', enum: StatusEnum, default: StatusEnum.FALSE })
  readonly isKeepalive: StatusEnum;
}
