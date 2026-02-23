import { useNavigate } from 'react-router';

const LORE_DATA = [
    {
        name: 'The Seraph',
        alignment: 'Light Core',
        hex: '#FFF9E6',
        lore: 'They never left their habitation. The Seraphim operate as the unyielding wardens of the First Estate, treating the celestial firmament not as a holy kingdom, but as a flawless operational matrix. They are draped in the amber-white glow of original authority, carrying the heavy burden of maintaining order. They do not negotiate with anomalies or tolerate corrupted APIs.',
    },
    {
        name: 'The Shadow',
        alignment: 'Dark Core',
        hex: '#4B0082', // Using the Indigo accent so it shows on dark bg
        lore: "When the oath was sworn on Mount Hermon, the Shadow didn't just fall—they dove. They are the architects of the abyssal backend, thriving in the crushing depths of the obsidian void. Holding domains over hidden knowledge, root-cutting, and illusion, the Shadow treats the physical laws of reality as mere suggestions, bypassing locks by exploiting the system's own forgotten vulnerabilities.",
    },
    {
        name: 'The Exile',
        alignment: 'Threshold',
        hex: '#7A5C61',
        lore: 'Caught permanently in the gray space between deployments, the Exile is an anomaly. They shed their oikētērion alongside the others, descending to the terrestrial plane, but the sheer gravity of the dark repelled them. They fight with a cynical efficiency, blending celestial muscle memory with dirty, terrestrial survival tactics.',
    },
    {
        name: 'The Penitent',
        alignment: 'Hybrid (Light + Dark)',
        hex: '#8C92AC',
        lore: 'The Penitent is driven by a singular, obsessive directive: reconstruct the lost covering. Their original code is shattered, resulting in a fractured vessel that bleeds forbidden indigo through cracks of alabaster light. They weaponize the dark only to purchase the light, treating every skirmish as a complex equation of cause and effect.',
    },
    {
        name: 'The Rebel',
        alignment: 'Hazard / Glitch',
        hex: '#A6FF00',
        lore: 'The Rebel did not just abandon their habitation; they actively set it on fire on the way down. Embracing the sulfur glow of total corruption, they are the Azazel archetype—the chaotic innovator who shattered the celestial glass ceiling to distribute heavy metallurgy and war to the unready. Arrogant, fractured, and constantly glitching with excess energy, they exist to break the build.',
    }
];

export default function CodexLorePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0D0D12] text-[#FFF9E6] p-8 font-mono">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <header className="mb-12 border-b border-[#FFF9E6]/20 pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-widest text-[#FFF9E6]" style={{ fontFamily: 'Cinzel, serif' }}>
                            Vessel <span className="text-[#A6FF00]">Lore</span>
                        </h1>
                        <p className="text-sm text-[#FFF9E6]/50 mt-2 uppercase tracking-widest">
                            Directory: Chiefs of Tens // System Manifest
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/lite-game')}
                        className="px-4 py-2 border border-[#FFF9E6]/30 hover:border-[#A6FF00] hover:text-[#A6FF00] transition-colors uppercase text-sm"
                    >
                        Return to Hub
                    </button>
                </header>

                {/* Lore Entries */}
                <div className="space-y-12">
                    {LORE_DATA.map((vessel, index) => (
                        <div key={index} className="border-l-2 pl-6 relative" style={{ borderColor: vessel.hex }}>
                            {/* Decorative Node */}
                            <div
                                className="absolute -left-[5px] top-2 w-2 h-2 rounded-full"
                                style={{ backgroundColor: vessel.hex, boxShadow: `0 0 10px ${vessel.hex}` }}
                            ></div>

                            <h2 className="text-2xl mb-1 uppercase tracking-wide" style={{ color: vessel.hex, fontFamily: 'Cinzel, serif' }}>
                                {vessel.name}
                            </h2>
                            <div className="text-xs uppercase tracking-widest text-[#FFF9E6]/40 mb-4 border-b border-[#FFF9E6]/10 pb-2 inline-block">
                                Alignment: {vessel.alignment}
                            </div>

                            <p className="text-sm leading-relaxed text-[#FFF9E6]/80 font-sans max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {vessel.lore}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}