import json
import os
import sqlite3
from opencc import OpenCC

cc = OpenCC('t2s')

def process_poetry(input_path, limit=None):
    all_poetry = []
    # 示例仅处理唐诗，你可以根据需要修改匹配规则
    for filename in os.listdir(input_path):
        if filename.startswith("poet.song") and filename.endswith(".json"):
            print(f"Processing file: {filename}")
            with open(os.path.join(input_path, filename), 'r', encoding='utf-8') as f:
                data = json.load(f)
                simplified_data = convert_json(data)
                for item in simplified_data:
                    # 标准化数据格式
                    cleaned_item = {
                        "title": item.get("title", ""),
                        "author": item.get("author", ""),
                        "content": "\n".join(item.get("paragraphs", [])),
                        "notes": "\n".join(item.get("notes", [])),
                        "dynasty": "宋代"
                    }
                    all_poetry.append(cleaned_item)
                    if limit and len(all_poetry) >= limit:
                        return all_poetry
    return all_poetry

def convert_json(data):
    if isinstance(data, dict):
        return {k: convert_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_json(i) for i in data]
    elif isinstance(data, str):
        return cc.convert(data)
    else:
        return data

def save_to_sqlite(data, db_name="poetry.db"):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS poems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            content TEXT,
            dynasty TEXT,
            notes TEXT
        )
    ''')
    for p in data:
        cursor.execute(
            "INSERT INTO poems (title, author, content, dynasty, notes) VALUES (?, ?, ?, ?, ?)",
            (p['title'], p['author'], p['content'], p['dynasty'], p['notes'])
        )
    conn.commit()
    conn.close()
    print(f"成功导入 {len(data)} 首诗词到 {db_name}")

# 执行流程
if __name__ == "__main__":
    # 1. 提取前 1000 首用于预览开发
    raw_data_path = "./全唐诗" # 指向仓库中的 json 文件夹
    sample_data = process_poetry(raw_data_path)
    
    # 2. 保存为 JSON 供前端 Next.js 快速原型使用
    with open('quantangshi_song.json', 'w', encoding='utf-8') as f:
        json.dump(sample_data, f, ensure_ascii=False, indent=2)
    
    # 3. 保存为 SQLite 供后续搜索功能使用
    save_to_sqlite(sample_data)