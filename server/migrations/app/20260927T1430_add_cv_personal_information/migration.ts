#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c50cbcb16802bc3e0dfa87670ca8e93790d798b09c90d51bf65be05372f0e8c6/contract';
import endContract from '../../snapshots/c50cbcb16802bc3e0dfa87670ca8e93790d798b09c90d51bf65be05372f0e8c6/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/ebec57869af262895be91a6a7fae8daba86d1f727d5481f6846d27ffb42e684d/contract';
import startContract from '../../snapshots/ebec57869af262895be91a6a7fae8daba86d1f727d5481f6846d27ffb42e684d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'cV',
        column: col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cV',
        column: col('fullName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cV',
        column: col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
