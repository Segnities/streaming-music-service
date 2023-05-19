import { Option } from "./MoreActionsGroup";

interface MoreActionsListProps {
    options: Option[];
    showMore: boolean;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreActionsList(props: MoreActionsListProps) {
    const rootClass = `${props.showMore ? "flex justify-center items-center fixed inset-0 z-[30]" : "hidden"}`;

    return (
        <div className={rootClass}
            id="more-actions-group"
            onClick={(e) => {
                props.setShowMore(false);
                e.stopPropagation();
            }}
        >
            <section className="block md:hidden my-5"

            >
                <h5 className="text-white font-bold my-3 text-2xl">Actions:</h5>
                <ul className="flex flex-col items-start justify-center">
                    {
                        props.options.map((option) => (
                            <li
                                key={option.key}
                                className="w-full h-12 flex items-center justify-center my-2 bg-[#4c426e] rounded-md focus-within:bg-transparent border-2 border-transparent focus-within:border-white focus-within:transition-colors focus-within:ease-out focus-within:duration-100">
                                <button className="text-white w-full h-full uppercase font-bold text-sm rounded-xl"
                                    onClick={() => option.onClickCallback()}
                                >{option.title}</button>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    );
}
