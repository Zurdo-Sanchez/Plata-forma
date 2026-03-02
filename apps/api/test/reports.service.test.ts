import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ReportsService } from '../src/modules/reports/reports.service';

test('monthly report shifts credit card spend to the next month', async () => {
  const reportsRepository = {
    listTransactionsForReport: async () => [
      {
        id: 'tx-1',
        date: new Date(Date.UTC(2026, 0, 10)),
        lines: [
          {
            amount: BigInt(-5000),
            categoryId: null,
            account: { id: 'acc-card', name: 'Visa', type: 'CREDIT_CARD' },
            category: null,
          },
          {
            amount: BigInt(5000),
            categoryId: 'cat-food',
            account: { id: 'acc-system', name: '__system__:equity', type: 'CASH' },
            category: { id: 'cat-food', name: 'Food' },
          },
        ],
      },
    ],
    sumByAccount: async () => [],
    findAccountsByIds: async () => [],
  };
  const householdsService = {
    assertMember: async () => {},
  };

  const service = new ReportsService(reportsRepository as any, householdsService as any);
  const report = await service.monthly('user-1', 'house-1', { month: '2026-02' } as any);

  assert.equal(report.totals.income, BigInt(0));
  assert.equal(report.totals.expense, BigInt(5000));

  const food = report.byCategory.find((item) => item.categoryId === 'cat-food');
  assert.ok(food);
  assert.equal(food?.amount, BigInt(-5000));
});
