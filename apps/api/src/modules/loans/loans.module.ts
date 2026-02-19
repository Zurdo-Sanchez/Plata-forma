import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HouseholdsModule } from '../households/households.module';
import { LoansController } from './loans.controller';
import { LoansRepository } from './loans.repository';
import { LoansService } from './loans.service';

@Module({
  imports: [AuthModule, HouseholdsModule],
  controllers: [LoansController],
  providers: [LoansService, LoansRepository],
})
export class LoansModule {}
