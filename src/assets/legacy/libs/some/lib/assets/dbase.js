import Dexie from 'dexie';

export default {
  async indexedDb(name, value) {
    try {
      const db = new Dexie('somelib');
      if (db) {
        db.version(1).stores({data: '&name, value'});
        if (value !== undefined) {
          await db.data.put({name, value});
        } else {
          const data = await db.data.get({name}).toArray();
          return data.value || null;
        }
      }
    } catch (e) {
      //
    }
    return null;
  },
};
