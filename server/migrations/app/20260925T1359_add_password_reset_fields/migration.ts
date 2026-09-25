#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1bec55cc33fd7536e45362ebbda471873ad39afeb68d04bf3db5c41cdcd03212/contract';
import startContract from '../../snapshots/1bec55cc33fd7536e45362ebbda471873ad39afeb68d04bf3db5c41cdcd03212/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ebec57869af262895be91a6a7fae8daba86d1f727d5481f6846d27ffb42e684d/contract';
import endContract from '../../snapshots/ebec57869af262895be91a6a7fae8daba86d1f727d5481f6846d27ffb42e684d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('passwordResetExpiresAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('passwordResetTokenHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_passwordResetTokenHash_key',
        columns: ['passwordResetTokenHash'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
