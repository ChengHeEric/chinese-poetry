"use server";
import db from "@/lib/db";

/**
 * 获取所有去重后的朝代列表，用于目录分类
 */
export async function getDynastiesAction() {
  const stmt = db.prepare(`
    SELECT DISTINCT dynasty 
    FROM poems 
    WHERE dynasty IS NOT NULL AND dynasty != ''
    ORDER BY CASE 
      WHEN dynasty = '先秦' THEN 1
      WHEN dynasty = '两汉' THEN 2
      WHEN dynasty = '魏晋' THEN 3
      WHEN dynasty = '南北朝' THEN 4
      WHEN dynasty = '隋代' THEN 5
      WHEN dynasty = '唐代' THEN 6
      WHEN dynasty = '五代' THEN 7
      WHEN dynasty = '宋代' THEN 8
      WHEN dynasty = '金朝' THEN 9
      WHEN dynasty = '元代' THEN 10
      WHEN dynasty = '明代' THEN 11
      WHEN dynasty = '清代' THEN 12
      ELSE 99 END
  `);
  return stmt.all().map((row: any) => row.dynasty);
}

/**
 * 组合查询：支持关键词搜索 + 朝代过滤
 */
export async function getPoemsAction(searchTerm: string = "", dynasty: string = "") {
  let query = `
    SELECT id, title, author, dynasty 
    FROM poems 
    WHERE (title LIKE ? OR author LIKE ?)
  `;
  const params: any[] = [`%${searchTerm}%`, `%${searchTerm}%`];

  // 如果指定了朝代，增加过滤条件
  if (dynasty) {
    query += " AND dynasty = ?";
    params.push(dynasty);
  }

  query += " LIMIT 500";
  
  const stmt = db.prepare(query);
  return stmt.all(...params);
}

/**
 * 获取诗词详情
 */
export async function getPoemDetailAction(id: number) {
  const stmt = db.prepare("SELECT * FROM poems WHERE id = ?");
  return stmt.get(id);
}

/**
 * 随机获取一首
 */
export async function getRandomPoemAction() {
  const stmt = db.prepare("SELECT * FROM poems ORDER BY RANDOM() LIMIT 1");
  return stmt.get();
}