import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HouseholdsModule } from '../households/households.module';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCardsRepository } from './credit-cards.repository';
import { CreditCardsService } from './credit-cards.service';

@Module({
  imports: [AuthModule, HouseholdsModule],
  controllers: [CreditCardsController],
  providers: [CreditCardsService, CreditCardsRepository],
})
export class CreditCardsModule {}
