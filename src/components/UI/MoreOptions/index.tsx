
interface Props {
    options: { key: string, title: string, href?: string, icon?: JSX.Element | undefined, onClickCallback: () => void, isCallbackBlocked: boolean }[]
    visible: boolean;


}

export default function MoreOptions(props: Props) {

    return (
        <>
            {
                props.visible && (
                    <div className="absolute duration-200 ease-linear transition-all md:flex justify-center rounded-lg p-1 min-h-[150px] min-w-[160px] bg-[#21106e] top-10 right-16  z-50">
                        {
                            props.options.map((option) => (
                                <p
                                    key={option.key}
                                    onClick={() => {
                                        if (option.isCallbackBlocked === false) {
                                            option.onClickCallback();
                                        } else {
                                            console.log("This artist exists in your list");

                                        }
                                    }}
                                    className="flex items-end font-semibold  uppercase pb-2 cursor-pointer text-xs  max-h-12 justify-center border-dashed border-white border-b-2  hover:border-[#7b64e2] hover:text-[#7b64e2]  my-2 text-white">
                                    {option.title}
                                </p>
                            ))
                        }
                    </div>
                )}
        </>

    );
}