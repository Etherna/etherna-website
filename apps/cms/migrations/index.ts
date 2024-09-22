import * as migration_20240922_072610 from './20240922_072610';

export const migrations = [
  {
    up: migration_20240922_072610.up,
    down: migration_20240922_072610.down,
    name: '20240922_072610'
  },
];
