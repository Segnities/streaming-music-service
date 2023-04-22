import { ModalSm } from "../Modal";

interface Props {
    confirmTitle: string;
    confirmAdditionalInfo?: string;
    confirmCallback: () => void;
    cancelCallback: () => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ConfirmModal(props: Props) {
    return (
        <ModalSm open={props.isOpen} setOpen={props.setIsOpen}>
            <div className="grid grid-flow-row-dense">
                <p className="text-xl p-2">
                    {
                        props.confirmTitle
                    }
                </p>
                {
                    props.confirmAdditionalInfo && (
                        <>
                            <hr />
                            <p>{props.confirmAdditionalInfo}</p>
                        </>
                    )
                }
                <div className="flex items-center justify-end">
                    <button className="bg-green-600 hover:bg-green-500 text-white font-semibold hover:duration-75 ease-out transition-colors py-2 px-10 rounded-md outline-2 outline-white outline outline-offset-4 hover:outline-indigo-700 mr-4">Confirm</button>
                    <button className="bg-red-600 hover:bg-red-500 text-white font-semibold hover:duration-75 ease-out transition-colors py-2 px-10 rounded-md outline-2 outline-white outline hover:outline-indigo-700 outline-offset-4 ml-4">Cancel</button>
                </div>
            </div>
        </ModalSm>
    );
}