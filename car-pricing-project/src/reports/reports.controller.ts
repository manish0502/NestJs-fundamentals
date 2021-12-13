import { Controller, Post, Body, UseGuards ,Get ,Param ,NotFoundException ,Patch} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';



@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto ,@CurrentUser() user:User) {
    return this.reportsService.create(body, user);
  }


  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
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
