import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from '@/common/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
