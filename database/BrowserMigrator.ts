import { Migrator, type Migration, type MigrationProvider } from 'kysely';
import Database from '.';

class BrowserMigrationProvider implements MigrationProvider {
  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations = import.meta.glob<Migration>('~/**/*.migration.ts');

    const result: Record<string, Migration> = {};

    for (const [path, migration] of Object.entries(migrations)) {
      const name = path.substring(
        path.lastIndexOf('/') + 1,
        path.indexOf('migration.ts') - 1
      );

      result[name] = await migration();
    }

    return result;
  }
}

export default new class BrowserMigrator {
  #migrator: Migrator;

  constructor() {
    this.#migrator = new Migrator({
      db: Database,
      provider: new BrowserMigrationProvider(),
    });
  }

  async migrate() {
    const { error, results } = await this.#migrator.migrateToLatest();

    if (error) {
      console.error(error);
    }

    if (!results) {
      return;
    }

    results.forEach((migration) => {
      if (migration.status === 'Success') {
        return;
      }

      console.error(`Failed to execute migration ${migration.migrationName}`);
    });
  }
}
