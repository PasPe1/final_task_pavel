import { Company } from '@/api/company/company.entity';
import { User } from '@/api/user/user.entity';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        type: 'postgres',
        host: this.config.get('DATABASE_HOST'),
        port: this.config.get('DATABASE_PORT'),
        username: this.config.get('DATABASE_USER'),
        password: this.config.get('DATABASE_PASSWORD'),
        database: this.config.get('DATABASE_NAME'),
        entities: [User, Company],
        synchronize: true,
    };
  }
}
