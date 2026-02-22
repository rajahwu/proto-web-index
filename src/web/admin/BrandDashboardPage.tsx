import { useBrandTokens } from '@/web/admin/useBrandtokens';

export default function BrandDashboardPage() {
    const { data, isLoading, error } = useBrandTokens();

    if (isLoading) return <div className="p-10 text-slate-400">Loading tokens from lattice...</div>;
    if (error) return <div className="p-10 text-red-500">Error loading tokens: {error.message}</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 md:p-16 font-sans">
            <div className="max-w-6xl mx-auto space-y-16">

                <header className="border-b border-slate-800 pb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Clearline7 Tokens</h1>
                    <p className="text-slate-400 mt-2">Live sync from identity_markers schema.</p>
                </header>

                {/* --- COLORS SECTION --- */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-slate-100">Color Palette</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {data?.colors?.map((color) => (
                            <div key={color.id} className="group flex flex-col gap-3">
                                <div
                                    className="h-24 w-full rounded-xl shadow-inner border border-white/5 transition-transform group-hover:scale-105"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <div>
                                    <p className="font-mono text-sm font-medium text-slate-300">{color.token_name}</p>
                                    <p className="font-mono text-xs text-slate-500 uppercase">{color.hex}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- TYPOGRAPHY SECTION --- */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-slate-100">Typography Scale</h2>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50 text-sm text-slate-400">
                                    <th className="p-4 font-medium">Token</th>
                                    <th className="p-4 font-medium">Font Family</th>
                                    <th className="p-4 font-medium">Preview</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {data?.typography?.map((typo) => (
                                    <tr key={typo.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4 font-mono text-sm text-slate-300">
                                            {typo.token_name}
                                            <span className="block text-xs text-slate-500 mt-1">{typo.size_rem} / {typo.font_weight}</span>
                                        </td>
                                        <td className="p-4 text-sm text-slate-400">
                                            {typo.font_family}
                                        </td>
                                        <td className="p-4 text-slate-100" style={{
                                            fontFamily: typo.font_family,
                                            fontSize: typo.size_rem,
                                            fontWeight: typo.font_weight,
                                            lineHeight: typo.line_height,
                                            letterSpacing: typo.letter_spacing
                                        }}>
                                            Sphinx of black quartz, judge my vow.
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}