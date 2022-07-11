import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Get, Param, Post, Delete } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { CompanyDto } from './company.dto';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    @Inject(CompanyService)
    private readonly service: CompanyService;

    @Get('all')
    @UseGuards(JwtAuthGuard)
    getCompanys() {
        return this.service.getCompanys();
    }

    @Post('count')
    @UseGuards(JwtAuthGuard)
    getCompanyPagination(@Body() page: number) {
        return this.service.getCompanyPagination(page);
    }

    @Get('byEmployees')
    @UseGuards(JwtAuthGuard)
    getEmployees() {
        return this.service.getEmployees();
    }

    @Get('byName')
    @UseGuards(JwtAuthGuard)
    getByName() {
        return this.service.getByName();
    }

    @Get('byService')
    @UseGuards(JwtAuthGuard)
    getByService() {
        return this.service.getByService();
    }

    @Get('allBy/:id')
    @UseGuards(JwtAuthGuard)
    getMyCompany(@Param('id') id: number) {
        return this.service.getMyCompany(id)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id: number) {
        return this.service.getById(id)
    }

    @Post('add')
    @UseGuards(JwtAuthGuard)
    createCompany(@Body() createCompanysDto: CompanyDto) {
        return this.service.createCompany(createCompanysDto);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    removeCompany(@Param('id') id: number) {
        return this.service.removeCompany(id)
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private updateCompany(@Param('id') id: number, @Body() body: CompanyDto) {
        return this.service.updateCompany(body, id);
    }


//   @Put('name')
//   @UseGuards(JwtAuthGuard)
//   @UseInterceptors(ClassSerializerInterceptor)
//   private updateName(@Body() body: CompanyDto, @Req() req: Request): Promise<Company> {
//     return this.service.updateName(body, req);
//   }
}