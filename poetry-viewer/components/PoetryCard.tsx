"use client";
import { motion } from "framer-motion";

interface PoemProps {
  title: string;
  author: string;
  content: string;
  dynasty: string;
}

export default function PoetryCard({ title, author, content, dynasty }: PoemProps) {
  return (
    <motion.div 
      className="bg-[var(--color-paper)] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-8 border-[var(--color-vermilion)] max-w-3xl w-[95%] mx-auto flex flex-col my-8 rounded-b-lg"
    >
      {/* 标题区域 */}
      <div className="p-8 md:p-12 pb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-[var(--color-ink)] mb-4 leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-3 text-ink/60 text-base md:text-lg">
          <span className="text-[var(--color-vermilion)] font-semibold">〔{dynasty}〕</span>
          <span className="tracking-[0.2em]">{author}</span>
        </div>
      </div>

      {/* 装饰分割线 */}
      <div className="flex justify-center items-center px-12 opacity-20">
        <div className="h-px bg-ink w-full"></div>
        <div className="mx-4 text-vermilion">✦</div>
        <div className="h-px bg-ink w-full"></div>
      </div>

      {/* 正文区域 - 彻底改为横排 */}
      <div className="p-8 md:p-16 pt-8 overflow-y-auto custom-scrollbar max-h-[60vh]">
        <div className="flex flex-col items-center space-y-6 text-center">
          {content.split('\n').map((line, i) => (
            <p 
              key={i} 
              className="text-xl md:text-2xl leading-relaxed tracking-wide text-[var(--color-ink)]/90 font-serif max-w-prose"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="p-6 text-center text-ink/20 text-xs tracking-widest uppercase">
        End of Poem
      </div>
    </motion.div>
  );
}