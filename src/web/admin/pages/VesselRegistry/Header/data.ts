import type { HeaderProps } from "./types";  

export const registryTitle = "Sinerine Forensic Archive";
export const registrySubtitle = "Vessel Classification Registry";
export const registryMeta = {
    document: "VESSEL-SIG-MASTER",
    version: "V-00 // INITIAL CLASSIFICATION",
    status: "ACTIVE CONTAINMENT"
}

const headerPropsData: HeaderProps = {
    title: registryTitle,
    subtitle: registrySubtitle,
    meta: registryMeta
}

export { headerPropsData };
