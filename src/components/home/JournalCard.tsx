import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JournalCard = ({ article }: { article: any }) => (
  <div className="group">
    <div className="glass-luxury rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={article.image} />
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
          <span className="text-[10px] font-label uppercase tracking-widest text-white">{article.category}</span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h4 className="font-heading font-medium text-2xl text-white italic mb-4 leading-tight">{article.title}</h4>
        <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">{article.excerpt}</p>
        <a className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-white hover:text-white/60 transition-colors" href="#">
          Đọc thêm <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>
  </div>
);

export default JournalCard;
