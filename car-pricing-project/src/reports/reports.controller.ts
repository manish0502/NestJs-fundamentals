import { Controller, Post, Body, UseGuards ,Get ,Param ,NotFoundException} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';


@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }


  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUser(@Param('id') id: string) {

    const user = await this.reportsService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

}
