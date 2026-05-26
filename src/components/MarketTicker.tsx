"use client";

import { MarketItem } from "@/lib/content";

interface MarketTickerProps {
  items: MarketItem[];
}

export default function MarketTicker({ items }: MarketTickerProps) {
  const doubled = [...items, ...items];

  return (
    <div className="bg-ticker-bg text-white overflow-hidden py-2 my-1">
      <div className="ticker-scroll flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-3 px-5 font-[family-name:var(--font-dm-sans)]"
          >
            <span className="text-[10px] uppercase tracking-wider text-gray-400">
              {item.label}
            </span>
            <span className="text-sm font-semibold">{item.value}</span>
            <span className="text-sm font-semibold text-green-400">
              ▲ {item.change}
            </span>
            <span className="text-gray-600 mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
