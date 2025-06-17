import * as migration_20250528_121051 from './20250528_121051';
import * as migration_20250528_175144 from './20250528_175144';
import * as migration_20250528_180715 from './20250528_180715';
import * as migration_20250531_115910 from './20250531_115910';

export const migrations = [
  {
    up: migration_20250528_121051.up,
    down: migration_20250528_121051.down,
    name: '20250528_121051',
  },
  {
    up: migration_20250528_175144.up,
    down: migration_20250528_175144.down,
    name: '20250528_175144',
  },
  {
    up: migration_20250528_180715.up,
    down: migration_20250528_180715.down,
    name: '20250528_180715',
  },
  {
    up: migration_20250531_115910.up,
    down: migration_20250531_115910.down,
    name: '20250531_115910'
  },
];
