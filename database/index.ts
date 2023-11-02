import { Kysely } from 'kysely';
import CapacitorSQLiteKyselyDialect from 'capacitor-sqlite-kysely';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

interface Database {
  test: {
    id?: bigint;
    name: string;
  };
}

const sqlite = new SQLiteConnection(CapacitorSQLite);

export { sqlite };

export default new Kysely<Database>({
  dialect: new CapacitorSQLiteKyselyDialect(sqlite, { name: 'nuxt' }),
});
