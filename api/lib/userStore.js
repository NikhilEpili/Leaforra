import mysql from 'mysql2/promise';

let pool;
let schemaReady = false;

function getConnectionString(env) {
  const connectionString = (env.MYSQL_URL || env.DATABASE_URL || '').trim();
  if (!connectionString) {
    throw new Error('MYSQL_URL is missing. Configure a MySQL connection string.');
  }
  return connectionString;
}

function parseOwnedPlants(raw) {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getMysqlPoolOptions(env) {
  const connectionString = getConnectionString(env);
  const parsed = new URL(connectionString);

  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: decodeURIComponent(parsed.pathname.replace(/^\//, '')),
  };
}

export function getUserStorePool(env = process.env) {
  if (!pool) {
    pool = mysql.createPool({
      ...getMysqlPoolOptions(env),
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: false,
    });
  }
  return pool;
}

export async function ensureUserSchema(env = process.env) {
  if (schemaReady) {
    return;
  }

  const db = getUserStorePool(env);
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      owned_plants VARCHAR(2000) NOT NULL
    );
  `);

  // Keep existing installations aligned with the current schema.
  await db.query(`
    ALTER TABLE users
    MODIFY COLUMN owned_plants VARCHAR(2000) NOT NULL;
  `);

  try {
    await db.query(`
      ALTER TABLE users
      DROP COLUMN IF EXISTS created_at;
    `);
  } catch {
    // Older MySQL variants may not support IF EXISTS on DROP COLUMN.
  }

  schemaReady = true;
}

export async function createUser(env, { name, email, passwordHash }) {
  const db = getUserStorePool(env);
  const [result] = await db.query(
    `
      INSERT INTO users (name, email, password_hash, owned_plants)
      VALUES (?, ?, ?, ?);
    `,
    [name, email.toLowerCase(), passwordHash, '[]']
  );

  const [rows] = await db.query(
    `
      SELECT id, name, email, owned_plants
      FROM users
      WHERE id = ?;
    `,
    [result.insertId]
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    owned_plants: parseOwnedPlants(user.owned_plants),
  };
}

export async function getUserByEmail(env, email) {
  const db = getUserStorePool(env);
  const [rows] = await db.query(
    `
      SELECT id, name, email, password_hash, owned_plants
      FROM users
      WHERE email = ?
      LIMIT 1;
    `,
    [email.toLowerCase()]
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password_hash: user.password_hash,
    owned_plants: parseOwnedPlants(user.owned_plants),
  };
}

export async function getOwnedPlantsByUserId(env, userId) {
  const db = getUserStorePool(env);
  const [rows] = await db.query(
    `
      SELECT owned_plants
      FROM users
      WHERE id = ?
      LIMIT 1;
    `,
    [userId]
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return parseOwnedPlants(user.owned_plants);
}

export async function updateOwnedPlantsByUserId(env, userId, ownedPlants) {
  const db = getUserStorePool(env);
  const [updateResult] = await db.query(
    `
      UPDATE users
      SET owned_plants = ?
      WHERE id = ?;
    `,
    [JSON.stringify(ownedPlants), userId]
  );

  if (!updateResult.affectedRows) {
    return null;
  }

  return ownedPlants;
}
