import React from "react";

interface Props {
    visible: boolean;
    setVisible: (visibility: boolean) => void;
    children: React.ReactNode;
}

function Modal(props: Props) {
    const { visible, setVisible, children } = props;

    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setVisible(false);
        }
    }

    return <div className="" onKeyDown={escapePress}>
        <div className="" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
}

export default Modal;