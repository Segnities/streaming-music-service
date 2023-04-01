import {MdMarkEmailRead} from "react-icons/md";
const ResetEmailIsSent = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center p-3'>
            <div className='flex items-center'>
                <MdMarkEmailRead size={132} color='green'/>
            </div>
            <div className='grid grid-flow-row text-center gap-4 mt-10'>
                <h2 className='text-3xl font-bold'>Confirm you're email address</h2>
                <p className='text-xl'>We sent a confirmation email to:</p>
                <p className='text-2xl'><strong>email@email.com</strong></p>
                <p className='text-xl'>Check you're email and click on the configuration link to continue</p>
            </div>
        </div>
    );
};

export default ResetEmailIsSent;