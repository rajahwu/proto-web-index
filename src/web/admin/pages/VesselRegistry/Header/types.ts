interface RegistryMeta {
    document: string;
    version: string;
    status: string;
}

interface HeaderProps {
    title: string;
    subtitle: string;
    meta: RegistryMeta;
}

export type { RegistryMeta, HeaderProps };