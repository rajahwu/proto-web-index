export default function SpectralFooter({ primaryHue }: { primaryHue?: string }) {
    const style = primaryHue
        ? { background: `linear-gradient(90deg, transparent, ${primaryHue}60, ${primaryHue}, ${primaryHue}60, transparent)` }
        : undefined;

    return <div className="spectral-footer" id="spectralFooter" style={style}></div>;
}