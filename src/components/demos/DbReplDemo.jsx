import React, { useState } from 'react';
import { Database, Search, PlusCircle, Check, Terminal } from 'lucide-react';

export default function DbReplDemo() {
  const [query, setQuery] = useState("SELECT * FROM users WHERE id = 42;");
  const [result, setResult] = useState({
    id: 42,
    username: 'hitesh',
    email: 'hbhatnagar917@gmail.com',
    pageSlot: 'Page 0, Slot 14 (Offset 0x01C0)',
    latency: '0.038 ms',
    indexLookup: 'O(log N) Binary Search Hit',
  });

  const runQuery = (qType) => {
    if (qType === 'select') {
      setQuery("SELECT * FROM users WHERE id = 42;");
      setResult({
        id: 42,
        username: 'hitesh',
        email: 'hbhatnagar917@gmail.com',
        pageSlot: 'Page 0, Slot 14 (Offset 0x01C0)',
        latency: '0.038 ms',
        indexLookup: 'O(log N) Binary Search Hit',
      });
    } else if (qType === 'insert') {
      setQuery("INSERT INTO users VALUES (88, 'systems_ai');");
      setResult({
        id: 88,
        username: 'systems_ai',
        email: 'systems@vit.ac.in',
        pageSlot: 'Page 0, Slot 15 (Offset 0x01E0)',
        latency: '0.052 ms',
        indexLookup: 'Sorted Insertion & Pager Sync OK',
      });
    } else {
      setQuery("EXPLAIN QUERY PLAN SELECT id FROM users;");
      setResult({
        id: 'INDEX_SCAN',
        username: 'PRIMARY_KEY_TREE',
        email: 'PAGES: 4 (Fixed-Byte Row Serialization)',
        pageSlot: 'Page Cache Hit Ratio: 99.4%',
        latency: '0.012 ms',
        indexLookup: 'B-Tree / Binary Search Path',
      });
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#060a14] p-4 text-xs font-mono shadow-inner">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Database size={13} className="text-sky-400" />
          <span className="text-[11px] text-slate-300 font-semibold">In-Memory Database Engine in C</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400">
          <span>O(log N) Search</span>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <button
          onClick={() => runQuery('select')}
          className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-200 transition"
        >
          SELECT id=42
        </button>
        <button
          onClick={() => runQuery('insert')}
          className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-200 transition"
        >
          INSERT row
        </button>
        <button
          onClick={() => runQuery('plan')}
          className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-200 transition"
        >
          EXPLAIN PAGER
        </button>
      </div>

      {/* Query REPL Box */}
      <div className="mt-2 rounded-xl bg-black/80 p-3 border border-white/[0.04]">
        <div className="text-sky-400 flex items-center gap-1.5">
          <span className="text-slate-500">db_cli&gt;</span>
          <span>{query}</span>
        </div>

        <div className="mt-2 pt-2 border-t border-white/[0.06] text-[11px] text-slate-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Serialized Page:</span>
            <span className="text-amber-300">{result.pageSlot}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Lookup Metric:</span>
            <span className="text-emerald-400 font-semibold">{result.indexLookup}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>Execution Latency:</span>
            <span className="text-slate-300">{result.latency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
