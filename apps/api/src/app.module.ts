import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CreditCardsModule } from './modules/credit-cards/credit-cards.module';
import { HouseholdsModule } from './modules/households/households.module';
import { LoansModule } from './modules/loans/loans.module';
import { ReportsModule } from './modules/reports/reports.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HouseholdsModule,
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    CreditCardsModule,
    LoansModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
