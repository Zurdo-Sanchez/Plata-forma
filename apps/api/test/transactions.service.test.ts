import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TransactionsService } from '../src/modules/transactions/transactions.service';

test('create uses entry type and keeps category on the account line', async () => {
  let createdInput: any = null;
  const transactionsRepository = {
    findAccountsByIds: async () => [{ id: 'acc-1', householdId: 'house-1', isActive: true, name: 'Main' }],
    findCategoriesByIds: async () => [{ id: 'cat-1', householdId: 'house-1', isActive: true }],
    ensureSystemAccount: async () => 'acc-system',
    createTransaction: async (data: any) => {
      createdInput = data;
      return data;
    },
  };
  const householdsService = {
    assertMember: async () => {},
  };

  const service = new TransactionsService(transactionsRepository as any, householdsService as any);

  await service.create(
    'user-1',
    'house-1',
    {
      date: '2026-02-19',
      entry: {
        accountId: 'acc-1',
        categoryId: 'cat-1',
        amount: '5000',
        type: 'EXPENSE',
      },
    } as any,
    'en',
  );

  assert.ok(createdInput);
  const [accountLine, systemLine] = createdInput.lines.create;
  assert.equal(accountLine.amount, BigInt(-5000));
  assert.equal(accountLine.category.connect.id, 'cat-1');
  assert.equal(systemLine.amount, BigInt(5000));
  assert.equal(systemLine.category, undefined);
});
