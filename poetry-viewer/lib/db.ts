import Database from 'better-sqlite3';
import path from 'path';

// 确保 poetry.db 放在 poetry-viewer 项目根目录下
const dbPath = path.join(process.cwd(), 'poetry.db');
const db = new Database(dbPath);

// 开启性能优化
db.pragma('journal_mode = WAL');

export default db;