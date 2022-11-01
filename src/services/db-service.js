import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = "logbook.db";

export async function getDbConnection() {
  const db = openDatabase({ name: DATABASE_NAME, location: 'default' });
  return db;
}

export async function createTable(db) {
  const query = "CREATE TABLE IF NOT EXISTS Image(imageId INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl VARCHAR(255))";
  return db.executeSql(query);
}

export async function initDatabase() {
  const db = await getDbConnection();
  await createTable(db);
  db.close();
}

export async function insertImage(db, url) {
  const insertQuery = `INSERT INTO Image (imageUrl) VALUES ("${url}")`;
  return db.executeSql(insertQuery);
}

export async function getImages(db) {
  const images = [];
  const results = await db.executeSql('SELECT * FROM Image');
  results.forEach(function (resultSet) {
    for (let i = 0; i < resultSet.rows.length; i++) {
      images.push(resultSet.rows.item(i));
    }
  });
  return images;
}