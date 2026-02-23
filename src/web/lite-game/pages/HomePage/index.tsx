// Inside src/web/lite-game/pages/LiteGameHome.tsx
import { useNavigate } from 'react-router';

export default function LiteGameHome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0D0D12] flex flex-col items-center justify-center font-mono">
            <h1 className="text-5xl text-[#FFF9E6] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
                V-00: LEFT HABITATION
            </h1>

            <div className="space-y-4 flex flex-col w-64">
                <button
                    onClick={() => navigate('/lite-game/title-start')}
                    className="border border-[#FFF9E6]/30 text-[#FFF9E6] py-3 hover:bg-[#FFF9E6]/10 transition uppercase tracking-widest"
                >
                    Initiate Sequence
                </button>

                <button
                    onClick={() => navigate('/codex')} // <-- Link to the new page
                    className="border border-[#FFF9E6]/10 text-[#FFF9E6]/60 py-3 hover:border-[#A6FF00] hover:text-[#A6FF00] transition uppercase tracking-widest"
                >
                    System Manifest (Lore)
                </button>
            </div>
        </div>
    );
}