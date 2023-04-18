
interface Props {
    options: { key: string, title: string, href?: string, icon?: JSX.Element | undefined }[]
    visible: boolean;
    right?: string | undefined;
    top?: string | undefined;
    bottom?: string | undefined;
    left?: string | undefined;
}

export default function MoreOptions(props: Props) {
    const top: string | undefined = props.top ? `top-[${props.top}]` : "";
    const bottom: string | undefined = props.bottom ? `bottom-[${props.bottom}]` : "";

    const left: string | undefined = props.left ? `left-[${props.left}]` : "";
    const right: string | undefined = props.right ? `right-[${props.right}]` : "";

    return (
        <>
            {
                props.visible && (
                    <div className="absolute duration-200 ease-linear transition-all md:flex justify-center rounded-lg p-3 min-h-[150px] min-w-[160px] bg-[#21106e] top-10 right-16 z-50">
                        {
                            props.options.map((option) => (
                                <>
                                    <div key={option.key}
                                        className="flex font-semibold items-center uppercase p-2 cursor-pointer  max-h-12 justify-center rounded-md hover:border-white border-[#7b64e2] border-dotted border-4 my-2 text-white gap-2">
                                        {option.title}
                                        {option.icon}
                                    </div>

                                </>
                            ))
                        }
                    </div>
                )}
        </>

    );
}