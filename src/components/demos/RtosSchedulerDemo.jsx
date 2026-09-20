import React, { useState } from 'react';
import { Play, Zap, RotateCcw, Clock, Activity } from 'lucide-react';

const initialTasks = [
  { id: 1, name: 'Sensor_ISR', priority: 1, state: 'RUNNING', ticks: 142, stack: '0x20001040' },
  { id: 2, name: 'Motor_PWM', priority: 2, state: 'READY', ticks: 89, stack: '0x20001440' },
  { id: 3, name: 'CLI_Telemetry', priority: 3, state: 'SLEEPING', ticks: 34, stack: '0x20001840' },
];

export default function RtosSchedulerDemo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [cpuTicks, setCpuTicks] = useState(265);
  const [log, setLog] = useState('Scheduler initialized. Task 1 (Sensor_ISR) dispatched.');

  const stepScheduler = () => {
    setCpuTicks((t) => t + 1);
    setTasks((prev) => {
      const next = [...prev];
      // Round robin / priority shift
      if (next[0].state === 'RUNNING') {
        next[0].state = 'READY';
        next[1].state = 'RUNNING';
        next[1].ticks += 1;
        setLog('Preemption: Context switched to Task 2 (Motor_PWM) [Priority 2].');
      } else if (next[1].state === 'RUNNING') {
        next[1].state = 'SLEEPING';
        next[2].state = 'RUNNING';
        next[2].ticks += 1;
        setLog('Yield: Task 2 sleeping. Dispatched Task 3 (CLI_Telemetry).');
      } else {
        next[2].state = 'READY';
        next[0].state = 'RUNNING';
        next[0].ticks += 1;
        setLog('Timer Tick ISR: Priority 1 (Sensor_ISR) pre-empts lower priorities.');
      }
      return next;
    });
  };

  const triggerInterrupt = () => {
    setCpuTicks((t) => t + 5);
    setTasks((prev) => {
      const next = [...prev];
      next[0].state = 'RUNNING';
      next[1].state = 'READY';
      next[2].state = 'READY';
      next[0].ticks += 5;
      return next;
    });
    setLog('HARDWARE INTERRUPT (EXTI_0): Preempted current task -> Dispatched Task 1 (ISR).');
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#060a14] p-4 text-xs font-mono shadow-inner">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-amber-400 animate-pulse" />
          <span className="text-[11px] text-slate-300 font-semibold">Preemptive RTOS Kernel (Standard C)</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <Clock size={11} className="text-sky-400" />
          <span>Ticks: <strong className="text-white">{cpuTicks}</strong></span>
        </div>
      </div>

      {/* Task List Matrix */}
      <div className="mt-3 space-y-1.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between rounded-xl p-2 transition border ${
              task.state === 'RUNNING'
                ? 'bg-amber-500/10 border-amber-500/30 text-white shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'bg-black/40 border-white/[0.05] text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-slate-500 font-bold">T{task.id}</span>
              <span className="font-semibold text-slate-200">{task.name}</span>
              <span className="text-[10px] text-sky-400/80">Pri:{task.priority}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  task.state === 'RUNNING'
                    ? 'bg-amber-400 text-black'
                    : task.state === 'READY'
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                    : 'bg-white/5 text-slate-500'
                }`}
              >
                {task.state}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">{task.stack}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls & Telemetry */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <button
            onClick={stepScheduler}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold px-2.5 py-1 text-[11px] transition active:scale-95"
          >
            <Play size={10} fill="currentColor" />
            <span>Tick / Dispatch</span>
          </button>
          <button
            onClick={triggerInterrupt}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 px-2.5 py-1 text-[11px] transition"
          >
            <Zap size={10} />
            <span>Simulate ISR</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-400 truncate max-w-full">
          <span className="text-amber-400">LOG: </span>
          <span>{log}</span>
        </div>
      </div>
    </div>
  );
}
