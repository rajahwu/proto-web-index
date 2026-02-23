import { useState } from "react";

export const vesselData: Record<string, any> = {
    seraph: {
        name: 'Seraph',
        code: 'SIG-SER-001',
        subtitle: 'the burning ones',
        primaryHue: '#D4A843',
        lightBias: 85,
        darkBias: 15,
        resilience: 40,
        stealth: 20,
        theology: 'Six-winged throne guardians. Their proximity to the source burns away impurity — or annihilates those too fragile to withstand it. In the Dudael Drop, a Seraph vessel channels light as both weapon and liability.',
        playstyle: 'High-light aggressive. Cards skew toward sanctified damage and purification effects. Vulnerable in deep Dark zones but devastating in Light-dominant encounters.',
        tags: ['SANCTIFIED', 'HIGH-LIGHT', 'PURIFIER'],
        assets: ['SIG_VesselSeraph_v01', 'ICN_VesselSeraph_v01', 'EMB_VesselSeraph_v01', 'CPT_VesselSeraph_v01']
    },
    shadow: {
        name: 'Shadow',
        code: 'SIG-SHD-001',
        subtitle: 'the hidden ones',
        primaryHue: '#7B4FA2',
        lightBias: 20,
        darkBias: 80,
        resilience: 60,
        stealth: 90,
        theology: 'Those who chose to dwell between the cracks. Shadow vessels operate in the negative space of the theological order — not fallen, but absent. In Dudael, they exploit blind spots in both Light and Dark systems.',
        playstyle: 'Stealth-oriented Dark specialist. Cards emphasize evasion, misdirection, and exploiting opponent positioning. Thrives in ambiguity, struggles in direct confrontation.',
        tags: ['QUARANTINE', 'HIGH-DARK', 'INFILTRATOR'],
        assets: ['SIG_VesselShadow_v01', 'ICN_VesselShadow_v01', 'EMB_VesselShadow_v01', 'CPT_VesselShadow_v01']
    },
    exile: {
        name: 'Exile',
        code: 'SIG-EXL-001',
        subtitle: 'the displaced ones',
        primaryHue: '#8BA0B5',
        lightBias: 50,
        darkBias: 50,
        resilience: 70,
        stealth: 50,
        theology: 'Neither aligned nor condemned. Exile vessels were stripped of their original assignment and exist in a state of jurisdictional limbo. In Dudael, they adapt to whatever parity the Depth demands.',
        playstyle: 'Adaptive generalist. Cards can shift between Light and Dark depending on context. No ceiling advantage but no floor weakness — the balanced survivor.',
        tags: ['CONTAINMENT', 'NEUTRAL', 'ADAPTIVE'],
        assets: ['SIG_VesselExile_v01', 'ICN_VesselExile_v01', 'EMB_VesselExile_v01', 'CPT_VesselExile_v01']
    },
    penitent: {
        name: 'Penitent',
        code: 'SIG-PEN-001',
        subtitle: 'the bowed ones',
        primaryHue: '#D4A04A',
        lightBias: 65,
        darkBias: 35,
        resilience: 80,
        stealth: 30,
        theology: 'Former transgressors seeking restoration through descent. The Penitent enters Dudael voluntarily as an act of atonement — the Drop is their liturgy. Each Depth cleared is a step toward rehabilitation.',
        playstyle: 'Endurance tank with Light lean. Cards emphasize absorption, sacrifice effects, and gradual Light accumulation. Slow but incredibly durable across long Depth runs.',
        tags: ['EVIDENCE', 'MED-LIGHT', 'ENDURANCE'],
        assets: ['SIG_VesselPenitent_v01', 'ICN_VesselPenitent_v01', 'EMB_VesselPenitent_v01', 'CPT_VesselPenitent_v01']
    },
    rebel: {
        name: 'Rebel',
        code: 'SIG-RBL-001',
        subtitle: 'the defiant ones',
        primaryHue: '#C04050',
        lightBias: 35,
        darkBias: 65,
        resilience: 50,
        stealth: 40,
        theology: 'Those who rejected both the original order and the quarantine. Rebel vessels view Dudael not as containment but as a system to be broken. Their descent is not penance — it is siege.',
        playstyle: 'Aggressive Dark-leaning disruptor. Cards emphasize breaking enemy defenses, parity manipulation, and high-risk/high-reward plays. Glass cannon with momentum mechanics.',
        tags: ['BREACH', 'MED-DARK', 'DISRUPTOR'],
        assets: ['SIG_VesselRebel_v01', 'ICN_VesselRebel_v01', 'EMB_VesselRebel_v01', 'CPT_VesselRebel_v01']
    }
};


interface VesselCellData {
    name: string;
    label: string;
    subtitle: string;
    bias: string;
}

export const vesselsCells: VesselCellData[] = [{
    label: "Class I",
    name: "Seraph",
    subtitle: "the burning ones",
    bias: "LIGHT: HIGH"
},
{
    label: "Class II",
    name: "Shadow",
    subtitle: "the hidden ones",
    bias: "NEUTRAL: LOW"
},
{
    label: "Class II B",
    name: "Leviathan",
    subtitle: "the abyssal ones",
    bias: "DARK: LOW"
},

{
    label: "Class III",
    name: "Exile",
    subtitle: "the displaced ones",
    bias: "DARK:  NEUTRAL"
},

{
    label: "Class III B",
    name: "Golem",
    subtitle: "the unyielding ones",
    bias: "NEUTRAL: NEUTRAL"
},
{
    label: "Class IV",
    name: "Penitent",
    subtitle: "the bound ones",
    bias: "DARK: MED-HIGH"
},

{
    label: "Class IV B",
    name: "Wraith",
    subtitle: "the elusive ones",
    bias: "LIGHT: LOW"
},

{
    label: "Class V",
    name: "Rebel",
    subtitle: "the defiant ones",
    bias: "DARK: LOW-MED"
},
{
    label: "Class V B",
    name: "Phoenix",
    subtitle: "the reborn ones",
    bias: "LIGHT: HIGH"
}


]
export default function VesselGridCell({ 
    vessels, 
    activeVesselId, 
    onSelectVessel 
}: { 
    vessels: VesselCellData[],
    activeVesselId: string,
    onSelectVessel: (id: string) => void
}) {
    return (
        <>
        {vessels.map((vessel, index) => {
            const vesselId = vessel.name.toLowerCase();
            const isActive = activeVesselId === vesselId;
            return (
                <div 
                    className={`vessel-cell ${isActive ? 'active' : ''}`} 
                    data-vessel={vesselId} 
                    key={index} 
                    onClick={() => onSelectVessel(vesselId)} 
                >
                    <div className="vessel-label">{vessel.label}</div>
                    <div className="vessel-name">{vessel.name}</div>
                    <div className="vessel-subtitle">{vessel.subtitle}</div>
                    <div className="vessel-bias">{vessel.bias}</div>
                </div>
            );
        })}
        </>
    );
}