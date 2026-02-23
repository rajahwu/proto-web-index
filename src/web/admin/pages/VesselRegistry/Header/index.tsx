import type { HeaderProps } from "./types";

export default function Header(headProps: HeaderProps) {
    return (
        <div className="registry-header">
            <div className="registry-title">
                {headProps.title}
                <span>{headProps.subtitle}</span>
            </div>
            <div className="registry-meta">
                DOCUMENT: {headProps.meta.document}
                VERSION: {headProps.meta.version}
                STATUS: {headProps.meta.status}
            </div>
        </div>
    )
}
