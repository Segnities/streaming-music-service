import { useNavigate } from "react-router";
import {
    getAuth,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    UserCredential,
    GoogleAuthProvider
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { firebaseApp, firebaseDatabase } from "../../../firebase/firebaseConfig";
import { getUsers } from "../../../utils/getUsers";
import { useDispatch } from "react-redux";
import { setUserSignUp } from "../../../store/reducers/auth";
import { FcGoogle } from "react-icons/fc";


function GoogleBtn() {
    const auth = getAuth(firebaseApp);
    const collectionRef = collection(firebaseDatabase, "users");
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnClick = async () => {
        const users = await getUsers();
        signInWithPopup(auth, googleProvider)
            .then((res: UserCredential) => {
                dispatch(setUserSignUp({ user: JSON.stringify(res?.user) }));

                if (users.find((usr) => usr.data.email === res.user.email) === undefined) {
                    addDoc(collectionRef, {
                        email: res?.user.email,
                        username: res?.user.displayName ?? res?.user?.email,
                    });
                }
                setPersistence(auth, browserLocalPersistence);
                navigate('/');
            })
            .catch((err) => alert(err.code + ':' + err.message));
    };
    return (
        <button onClick={handleOnClick} className="w-72 sm:w-96 flex items-center my-2 justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
            <FcGoogle size={21} />
            <span className="text-base text-gray-600 pl-2 font-semibold">CONTINUE WITH GOOGLE</span>
        </button>
    );
}

export default GoogleBtn;