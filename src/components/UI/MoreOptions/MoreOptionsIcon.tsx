
import { User } from "firebase/auth";
import { BsThreeDots } from "react-icons/bs";

interface MoreOptionsIconProps {
    user: User | null;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    showMore: boolean;
}

export default function MoreOptionsIcon({ user, setShowMore, showMore }: MoreOptionsIconProps) {
    return (
        <div className={`hidden md:block z-[2000]`}>
            {
                user?.uid && (
                    <BsThreeDots size={32} className="cursor-pointer" color="white" onClick={() => setShowMore(!showMore)} />
                )
            }

        </div>
    );
}