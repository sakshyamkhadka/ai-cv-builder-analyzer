#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/c50cbcb16802bc3e0dfa87670ca8e93790d798b09c90d51bf65be05372f0e8c6/contract';
import startContract from '../../snapshots/c50cbcb16802bc3e0dfa87670ca8e93790d798b09c90d51bf65be05372f0e8c6/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d595c37ff3c3c366a1d319fff95cff6c3c4ed558d45de2975511d097afbb2946/contract';
import endContract from '../../snapshots/d595c37ff3c3c366a1d319fff95cff6c3c4ed558d45de2975511d097afbb2946/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'education',
        column: col('currentlyStudying', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
