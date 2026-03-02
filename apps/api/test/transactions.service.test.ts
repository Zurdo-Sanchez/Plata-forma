import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TransactionsService } from '../src/modules/transactions/transactions.service';

test('create uses entry sides and keeps category on the category side', async () => {
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
        from: { kind: 'CATEGORY', id: 'cat-1' },
        to: { kind: 'ACCOUNT', id: 'acc-1' },
        amount: '5000',
      },
    } as any,
    'en',
  );

  assert.ok(createdInput);
  const [fromLine, toLine] = createdInput.lines.create;
  assert.equal(fromLine.amount, BigInt(-5000));
  assert.equal(fromLine.category.connect.id, 'cat-1');
  assert.equal(toLine.amount, BigInt(5000));
  assert.equal(toLine.category, undefined);
});
