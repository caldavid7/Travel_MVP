import React, { FunctionComponent } from "react";
import styles from "./IconButton.module.css";

type IconButtonProps = {
    className: string;
    style: React.CSSProperties;
    Icon: any;
    onClick: () => void;
};

export function IconButton({ Icon, className, style, onClick }: IconButtonProps) {
    return (
        <button className={`${styles.iconButton} ${className}`} style={style} onClick={onClick}>
            <Icon className={styles.icon} width={24} height={24} />
        </button>
    );
}
