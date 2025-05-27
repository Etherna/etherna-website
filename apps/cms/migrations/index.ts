import * as migration_20250527_135525 from './20250527_135525';
import * as migration_20250527_181749 from './20250527_181749';
import * as migration_20250527_185039 from './20250527_185039';

export const migrations = [
  {
    up: migration_20250527_135525.up,
    down: migration_20250527_135525.down,
    name: '20250527_135525',
  },
  {
    up: migration_20250527_181749.up,
    down: migration_20250527_181749.down,
    name: '20250527_181749',
  },
  {
    up: migration_20250527_185039.up,
    down: migration_20250527_185039.down,
    name: '20250527_185039'
  },
];
