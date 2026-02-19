import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HouseholdsController } from './households.controller';
import { HouseholdsRepository } from './households.repository';
import { HouseholdsService } from './households.service';

@Module({
  imports: [AuthModule],
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdsRepository],
  exports: [HouseholdsService, HouseholdsRepository],
})
export class HouseholdsModule {}
