
import { User } from "firebase/auth";

import LineDivider from "../LineDivider";
import MoreActionsList from "./MoreActionsList";
import MoreOptionsIcon from "./MoreOptionsIcon";
import MoreOptionsContent from "./MoreOptionsContent";

export type Option = {
    key: string,
    title: string,
    href?: string,
    icon?: JSX.Element,
    nested?: boolean;
    onClickCallback: () => void
}

interface MoreActionsGroupProps {
    user: User | null;
    showMore: boolean;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    optionsList: Option[];

}

export function MoreActionsGroup(props: MoreActionsGroupProps) {
    const { user, showMore, setShowMore, optionsList } = props;
    return (
        <>
            <div className="relative flex flex-col my-5">
                <MoreOptionsIcon
                    user={user}
                    showMore={showMore}
                    setShowMore={setShowMore}
                />
                {
                    user?.uid && (
                        <MoreOptionsContent
                            options={optionsList}
                            visible={showMore}
                        />)
                }
                <LineDivider />
            </div>
            {
                user?.uid && (
                    <MoreActionsList options={optionsList} showMore={showMore} setShowMore={setShowMore} />
                )
            }

        </>
    );
}



