import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';

const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
}

@Module({
  imports: [CoffeeModule, TypeOrmModule.forRoot({...postgresConfig})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
