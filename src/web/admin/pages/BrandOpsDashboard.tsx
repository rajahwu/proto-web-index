import { useState } from 'react';

// --- DATA MOCKS ---
const SPRINT_TASKS = [
    { id: 1, title: 'Admin/Sprint Dashboard UI', status: 'IN_PROGRESS', type: 'SYSTEM' },
    { id: 2, title: 'Identity Markers (DB Seed)', status: 'PENDING', type: 'DATA' },
    { id: 3, title: 'Character Lore Doc (Chiefs of Tens)', status: 'PENDING', type: 'LORE' },
    { id: 4, title: 'Card Flavor Text Revision (12 Core)', status: 'PENDING', type: 'LORE' },
    { id: 5, title: 'Level Narrative Beats (Dudael Drop)', status: 'PENDING', type: 'LORE' },
];

const BRAND_TOKENS = [
    { token: 'sinerine.light.core', hex: '#FFF9E6', label: 'The First Estate' },
    { token: 'sinerine.light.accent', hex: '#FFD700', label: 'Gilded Ember' },
    { token: 'sinerine.dark.core', hex: '#0D0D12', label: 'Obsidian Void' },
    { token: 'sinerine.dark.accent', hex: '#4B0082', label: 'Forbidden Indigo' },
    { token: 'sinerine.hazard.glitch', hex: '#A6FF00', label: 'Sulfur Glow' },
    { token: 'sinerine.threshold', hex: '#7A5C61', label: 'Smoky Mauve' },
];

export default function BrandOpsDashboardPage() {
    const [tasks, setTasks] = useState(SPRINT_TASKS);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t =>
            t.id === id
                ? { ...t, status: t.status === 'DONE' ? 'PENDING' : 'DONE' }
                : t
        ));
    };

    return (
        <div className="min-h-screen bg-[#0D0D12] text-[#FFF9E6] p-8 font-mono" style={{ fontFamily: '"JetBrains Mono", monospace' }}>

            {/* HEADER */}
            <header className="mb-10 border-b border-[#A6FF00]/30 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-widest text-[#FFF9E6] uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                        V-00 <span className="text-[#A6FF00]">System Audit</span>
                    </h1>
                    <p className="text-sm text-[#FFF9E6]/60 mt-2 tracking-widest uppercase">
                        Identity Marker: Sinerine | Core Link: FA-01
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-[#A6FF00] text-sm animate-pulse">● SYSTEM ONLINE</div>
                    <div className="text-xs text-[#FFF9E6]/40 mt-1">HABITATION: LEFT</div>
                </div>
            </header>

            {/* DASHBOARD GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: SPRINT TRACKER */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border border-[#FFF9E6]/10 bg-[#FFF9E6]/5 p-6 rounded-sm">
                        <h2 className="text-xl text-[#A6FF00] mb-6 uppercase border-b border-[#A6FF00]/20 pb-2">
                            Master Sprint: Initialization
                        </h2>

                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className={`flex items-center justify-between p-3 border cursor-pointer transition-all duration-200
                    ${task.status === 'DONE'
                                            ? 'border-[#FFF9E6]/10 bg-[#0D0D12] opacity-50'
                                            : 'border-[#4B0082]/50 bg-[#4B0082]/10 hover:border-[#A6FF00]/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-4 h-4 border flex items-center justify-center
                      ${task.status === 'DONE' ? 'border-[#A6FF00] text-[#A6FF00]' : 'border-[#FFF9E6]/30'}
                    `}>
                                            {task.status === 'DONE' && '✓'}
                                        </div>
                                        <span className={`text-sm ${task.status === 'DONE' ? 'line-through text-[#FFF9E6]/50' : ''}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <span className="text-xs tracking-widest px-2 py-1 bg-[#0D0D12] text-[#FFF9E6]/50 border border-[#FFF9E6]/10">
                                        {task.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: IDENTITY MARKERS & TOKENS */}
                <div className="space-y-6">
                    {/* TOKENS PANEL */}
                    <div className="border border-[#A6FF00]/20 bg-[#0D0D12] p-6 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0D0D12] via-[#A6FF00] to-[#0D0D12] opacity-50"></div>

                        <h2 className="text-lg text-[#FFF9E6] mb-4 uppercase">Color Tokens</h2>

                        <div className="space-y-4">
                            {BRAND_TOKENS.map((token) => (
                                <div key={token.token} className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-sm border border-[#FFF9E6]/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                        style={{ backgroundColor: token.hex, boxShadow: token.token.includes('hazard') ? '0 0 15px #A6FF00' : '' }}
                                    ></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-[#FFF9E6]">{token.label}</span>
                                        <span className="text-[10px] text-[#A6FF00]">{token.token} ({token.hex})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ACTIVE ARCHETYPES PANEL */}
                    <div className="border border-[#FFF9E6]/10 bg-[#FFF9E6]/5 p-6 rounded-sm">
                        <h2 className="text-lg text-[#FFF9E6] mb-4 uppercase">Vessels (Classes)</h2>
                        <ul className="text-sm space-y-2 text-[#FFF9E6]/70">
                            <li className="flex justify-between"><span>The Seraph</span> <span className="text-[#FFD700]">Light Core</span></li>
                            <li className="flex justify-between"><span>The Shadow</span> <span className="text-[#4B0082]">Dark Core</span></li>
                            <li className="flex justify-between"><span>The Exile</span> <span className="text-[#7A5C61]">Threshold</span></li>
                            <li className="flex justify-between"><span>The Penitent</span> <span className="text-[#FFF9E6]">Light + Dark</span></li>
                            <li className="flex justify-between border-t border-[#FFF9E6]/10 pt-2 mt-2">
                                <span>The Rebel</span> <span className="text-[#A6FF00]">Hazard</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}