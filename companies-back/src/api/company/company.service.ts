import { Body, HttpException, HttpStatus, Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CompanyDto } from './company.dto';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  @InjectRepository(Company)
  private readonly repository: Repository<Company>;

  getCompanys() {
    return this.repository.find();
  }

  getMyCompany(profile_id: number) {
    return this.repository.find({profile_id})
  }

  async getById(id: number) {
    const company = await this.repository.findOne({ where: {id}});
    if (company) {
      return company;
    }
    throw new HttpException('Company with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getCompanyPagination(page: number) {
    const COUNT = 5
    return this.repository.findAndCount({
      // skip: 
      take: COUNT, skip: (page - 1) * COUNT
    })
  }

  async getEmployees() {
    return await this.repository.find({
        order: {
            employeesCount: 'DESC'
        }
    })
  }

  async getByName() {
    return await this.repository.find({
        order: {
            name: 'ASC'
        }
    })
  }

  async getByService() {
    return await this.repository.find({
        order: {
            service: 'ASC'
        }
    })
  }

  async createCompany(createCompanysDto: CompanyDto) {
      const newCompany = this.repository.create(createCompanysDto)
      return await this.repository.save(newCompany);
  }
  
  async removeCompany(id: number) {
    await this.repository.delete(id);
    return this.repository.find()
  }

  public async updateCompany(body: CompanyDto, id: number) {
    return this.repository.update({id}, body)
  }

}