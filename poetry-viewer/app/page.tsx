"use client";

import { useState, useEffect } from "react";
import { getPoemsAction, getPoemDetailAction, getRandomPoemAction, getDynastiesAction } from "./actions";
import PoetryCard from "../components/PoetryCard";
import { RefreshCw, Search, ScrollText, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentPoem, setCurrentPoem] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [dynasties, setDynasties] = useState<string[]>([]);
  const [selectedDynasty, setSelectedDynasty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const [random, initialList, dynastyList] = await Promise.all([
        getRandomPoemAction(),
        getPoemsAction(""),
        getDynastiesAction()
      ]);
      setCurrentPoem(random);
      setList(initialList);
      setDynasties(dynastyList);
      setLoading(false);
    }
    init();
  }, []);

  // 联动更新：当搜索词或朝代改变时触发
  const updateList = async (term: string, dynasty: string) => {
    const results = await getPoemsAction(term, dynasty);
    setList(results);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    updateList(term, selectedDynasty);
  };

  const handleDynastyChange = (dynasty: string) => {
    const newDynasty = selectedDynasty === dynasty ? "" : dynasty; // 再次点击取消筛选
    setSelectedDynasty(newDynasty);
    updateList(searchTerm, newDynasty);
  };

  if (loading || !currentPoem) return <div className="h-screen w-full flex items-center justify-center bg-[#ebe4d1] font-kaishu text-xl">载入中...</div>;

  return (
    <div className="flex h-screen bg-[#ebe4d1] font-kaishu overflow-hidden text-ink">
      
      {/* 侧边栏 */}
      <aside className="w-80 bg-[var(--color-paper)] border-r border-black/5 flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center gap-2 mb-6 text-vermilion">
            <ScrollText size={24} />
            <h1 className="text-xl font-bold tracking-tighter">中华诗集</h1>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" size={16} />
            <input 
              type="text" 
              placeholder="搜索诗名、作者..." 
              value={searchTerm}
              className="w-full pl-10 pr-4 py-2 bg-black/5 rounded-full outline-none focus:ring-1 focus:ring-vermilion/30 text-sm"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* 朝代过滤器 */}
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 custom-scrollbar">
            {dynasties.map((d) => (
              <button
                key={d}
                onClick={() => handleDynastyChange(d)}
                className={`px-3 py-1 rounded-full text-xs transition-all border ${
                  selectedDynasty === d 
                  ? 'bg-vermilion text-white border-vermilion' 
                  : 'bg-transparent border-ink/10 text-ink/60 hover:border-vermilion/30'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 诗词列表 */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {list.length > 0 ? list.map((p) => (
            <button 
              key={p.id}
              onClick={() => {
                getPoemDetailAction(p.id).then(setCurrentPoem);
              }}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                currentPoem.id === p.id ? 'bg-vermilion text-white shadow-lg' : 'hover:bg-black/5'
              }`}
            >
              <div className="font-bold truncate">{p.title}</div>
              <div className={`text-xs mt-1 opacity-60`}>{p.author} · {p.dynasty}</div>
            </button>
          )) : (
            <div className="text-center py-10 text-ink/30 text-sm">此分类下暂无诗词</div>
          )}
        </nav>
      </aside>

      {/* 主展示区保持不变 */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        <div className="absolute top-8 right-8 z-30">
          <button onClick={() => getRandomPoemAction().then(setCurrentPoem)} className="flex items-center gap-2 px-6 py-3 bg-vermilion text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">
            <RefreshCw size={18} />
            <span className="font-medium tracking-widest text-sm">偶遇佳作</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPoem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <PoetryCard {...currentPoem} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}