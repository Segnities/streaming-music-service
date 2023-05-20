interface AbsoluteFlexWrapperProps {
    children: React.ReactNode;
}

export default function AbsoluteFlexWrapper({ children }: AbsoluteFlexWrapperProps) {
    return (
        <div className="absolute inset-0 flex flex-row items-center">
            {children}
        </div>
    );
}