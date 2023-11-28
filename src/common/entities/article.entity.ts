import { Category, Tag, TimestampedEntity, User } from '@/common/entities';
import { ArticleTypeEnum, ArticleStatusEnum, BolEnum } from '@/helper/enums';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'article' })
@Unique(['title'])
export class Article extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('index_title')
  @Column({ type: 'varchar', length: 60 })
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ type: 'bigint', default: 0 })
  likes: number;

  @Column({ type: 'bigint', default: 0 })
  views: number;

  @Column({
    type: 'enum',
    enum: ArticleTypeEnum,
    default: ArticleTypeEnum.ORIGINAL,
    comment: '文章类型: 1原创 2转载 3翻译',
  })
  type: ArticleTypeEnum;

  @Column({
    type: 'enum',
    enum: ArticleStatusEnum,
    default: ArticleStatusEnum.DRAFT,
    comment: '文章状态: 1已发布 2私密 3草稿箱 4已删除 5待审核 6已拒绝',
  })
  status: ArticleStatusEnum;

  @Column({
    name: 'is_top',
    type: 'enum',
    enum: BolEnum,
    default: BolEnum.FALSE,
  })
  isTop: BolEnum;

  @ManyToOne(() => User, (User) => User.articles)
  author: User;

  @ManyToOne(() => Category, (Category) => Category.articles)
  category: Category;

  @ManyToMany(() => Tag, (Tag) => Tag.articles)
  @JoinTable({ name: 'article_tag_relation' })
  tags: Tag[];
}