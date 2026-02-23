import React, { useEffect, useState } from 'react';
import { SvgComponents } from '../SvgTemplates';

export default function SigilDisplayArea({ activeVessel, activeVesselId }: { activeVessel: any, activeVesselId: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, [activeVesselId]);

    if (!activeVessel) return null;

    return (
        <div className="display-area">
            <div className="sigil-viewport" id="sigilViewport">
                    <div className={`svg-container ${isVisible ? 'visible' : ''}`}>
                        {(() => {
                            const Cmp = SvgComponents[activeVesselId];
                            return Cmp ? <Cmp /> : null;
                        })()}
                    </div>
            </div>
            <div className="data-panel" id="dataPanel">
                <div className="data-section">
                    <div className="data-label">Classification</div>
                    <div className="data-value">
                        <strong style={{ color: activeVessel.primaryHue }}>{activeVessel.name}</strong> — {activeVessel.subtitle}<br />
                        <span style={{ fontSize: '8px', color: '#3A3D48' }}>{activeVessel.code}</span>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        {activeVessel.tags?.map((t: string) => (
                            <span key={t} className="classification-tag" style={{ borderColor: `${activeVessel.primaryHue}40`, color: `${activeVessel.primaryHue}90` }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="data-section">
                    <div className="data-label">Spectral Analysis</div>
                    <div className="stat-bar-container">
                        <span className="stat-label">Light</span>
                        <div className="stat-bar"><div className="stat-fill" style={{ width: `${activeVessel.lightBias}%`, background: activeVessel.primaryHue }}></div></div>
                        <span className="stat-value">{activeVessel.lightBias}</span>
                    </div>
                    <div className="stat-bar-container">
                        <span className="stat-label">Dark</span>
                        <div className="stat-bar"><div className="stat-fill" style={{ width: `${activeVessel.darkBias}%`, background: '#4A2D6B' }}></div></div>
                        <span className="stat-value">{activeVessel.darkBias}</span>
                    </div>
                    <div className="stat-bar-container">
                        <span className="stat-label">Resilience</span>
                        <div className="stat-bar"><div className="stat-fill" style={{ width: `${activeVessel.resilience}%`, background: '#6B7B8D' }}></div></div>
                        <span className="stat-value">{activeVessel.resilience}</span>
                    </div>
                    <div className="stat-bar-container">
                        <span className="stat-label">Stealth</span>
                        <div className="stat-bar"><div className="stat-fill" style={{ width: `${activeVessel.stealth}%`, background: '#3A3D48' }}></div></div>
                        <span className="stat-value">{activeVessel.stealth}</span>
                    </div>
                </div>

                <div className="data-section">
                    <div className="data-label">Theological Profile</div>
                    <div className="theology-note">{activeVessel.theology}</div>
                </div>

                <div className="data-section">
                    <div className="data-label">Playstyle Designation</div>
                    <div className="data-value" style={{ fontSize: '10px', lineHeight: 1.8 }}>{activeVessel.playstyle}</div>
                </div>

                <div className="data-section">
                    <div className="data-label">Asset Registry</div>
                    <div className="asset-table">
                        {activeVessel.assets?.map((a: string) => {
                            const prefix = a.split('_')[0];
                            return (
                                <div key={a}>
                                    <span className="prefix">{prefix}_</span>{a.replace(prefix + '_', '')}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}