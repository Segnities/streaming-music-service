import React from "react";

interface Props {
    visible: boolean;
    setVisible: (visibility: boolean) => void;
    children: React.ReactNode;
}

function Modal(props: Props) {
    const { visible, setVisible, children } = props;

    const containerModalClass: string = `${!visible && "hidden"} fixed inset-0 bg-[rgba(0,0,0,0.5)] ${visible && "flex justify-center items-center"} z-10`

    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setVisible(false);
        }
    }

    return <div className={containerModalClass} onKeyDown={escapePress}>
        <div className="min-w-[50%] min-h-[300px] p-6 bg-white rounded-2xl" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
}

export default Modal;