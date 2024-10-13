import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { MomentService } from './moment.service'
import { CreateMomentDto, UpdateMomentDto, FindAllMomentDto } from './dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdentityGuard } from '@/common/guards'

@ApiTags('Moment')
@ApiBearerAuth()
@Controller('moment')
export class MomentController {
  constructor(private readonly momentService: MomentService) {}

  @Post()
  @UseGuards(IdentityGuard)
  @ApiOperation({ summary: '发布动态' })
  create(@Body() data: CreateMomentDto) {
    return this.momentService.create(data)
  }

  @Get()
  @ApiOperation({ summary: '获取动态列表' })
  findAll(@Query() params: FindAllMomentDto) {
    return this.momentService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.momentService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMomentDto: UpdateMomentDto) {
    return this.momentService.update(+id, updateMomentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.momentService.remove(+id)
  }
}
