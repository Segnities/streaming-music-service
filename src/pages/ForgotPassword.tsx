import {useState} from "react";

import ResetEmail from "../components/ResetEmail";
import ResetEmailIsSent from "../components/ResetEmailIsSent";

function ForgotPassword() {
    const [isResetEmailSent, setIsResetEmailSent] = useState<boolean>(false);

    return (
        isResetEmailSent ? <ResetEmailIsSent/> : <ResetEmail setIsResetEmailSent={setIsResetEmailSent}/>
    )
}

export default ForgotPassword;