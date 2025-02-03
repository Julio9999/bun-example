import fs from 'fs';
import path from 'path';
import { dbClient } from './infraestructure/database/db-client';


async function runMigration() {
  try {

    await dbClient`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'));

    for (const file of migrationFiles) {
      const migrationName = path.basename(file, '.sql');
      const hasRun = await checkIfMigrationRan(migrationName);

      if (hasRun) {
        console.log(`La migración ${migrationName} ya ha sido ejecutada.`);
        continue;
      }

      const filePath = path.join(__dirname, 'migrations', file);
      const migrationSQL = fs.readFileSync(filePath, 'utf-8');

      console.log(`Ejecutando migración: ${file}`);
      await dbClient(migrationSQL);

      await markMigrationAsExecuted(migrationName);
    }

    console.log('Migraciones completadas con éxito');
  } catch (err) {
    console.error('Error ejecutando las migraciones:', err);
  } finally {
    await dbClient.end();
  }
}

async function checkIfMigrationRan(migrationName: string): Promise<boolean> {
  const res = await dbClient(
    'SELECT 1 FROM migrations WHERE name = $1 LIMIT 1',
    [migrationName]
  );
  return res.length > 0;
}

async function markMigrationAsExecuted(migrationName: string) {
  await dbClient(
    'INSERT INTO migrations (name) VALUES ($1)',
    [migrationName]
  );
}

runMigration();
