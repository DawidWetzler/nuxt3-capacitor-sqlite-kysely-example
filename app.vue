🪈<script lang="ts" setup>
import { sql } from 'kysely';
import Database, { sqlite } from '~/database';
import Migrator from '~/database/BrowserMigrator';

// see: plugins/sqlite.ts for registering jeep-sqlite on the web
// see: database/BrowserMigrator to have a look on implementing migraitons on the web
onMounted(async () => {
  await Migrator.migrate();

  // query builder
  console.log(await Database.insertInto('test').values({ name: 'wecler' }).execute());
  console.log(await Database.selectFrom('test').selectAll().execute());

  // raw queries
  console.log(await sql`INSERT INTO test VALUES (null, 'Dawid')`.execute(Database));


  // this also works but...
  // if the migrator is user you have to ensure that migrator runs before all the queries
  // will be executed therefore it's probably better to use sql from kysely

  const db = await sqlite.retrieveConnection('nuxt', false);
  await db.run("INSERT INTO `test` VALUES (null, 'Jean')");
  console.log(await db.query('SELECT `id`, `name` FROM test'));
});

</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
