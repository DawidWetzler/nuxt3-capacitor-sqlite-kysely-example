import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

export default defineNuxtPlugin({
  name: 'sqlite',
  enforce: 'pre',
  hooks: {
    async 'app:beforeMount'() {
      customElements.define('jeep-sqlite', JeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      const jeepSqliteEl = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqliteEl);
    },
  },
});
