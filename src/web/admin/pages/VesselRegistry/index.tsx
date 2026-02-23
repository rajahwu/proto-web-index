import React, { useState } from 'react';
import Header from './Header';
import VesselGridCell from './Grid/Cell';
import SigilDisplayArea from './SigilDisplayArea';
import SpectralFooter from './SpectralFooter';
import { vesselData, vesselsCells } from './Grid/Cell';
import './styles.css';

export default function VesselRegistry() {
  const [activeVesselId, setActiveVesselId] = useState<string>('seraph');

  const activeVessel = vesselData[activeVesselId];

  return (
    <div className="vessel-registry-container">
      <Header
        title="Sinerine Forensic Archive"
        subtitle="Vessel Classification Registry"
        meta={{
          document: "VESSEL-SIG-MASTER",
          version: "V-00 // INITIAL CLASSIFICATION",
          status: "ACTIVE CONTAINMENT"
        }}
      />

      <div className="vessel-grid" id="vesselGrid">
        <VesselGridCell 
          vessels={vesselsCells} 
          activeVesselId={activeVesselId}
          onSelectVessel={setActiveVesselId}
        />
      </div>

      <SigilDisplayArea activeVessel={activeVessel} activeVesselId={activeVesselId} />

      <SpectralFooter primaryHue={activeVessel?.primaryHue} />
    </div>
  );
}
