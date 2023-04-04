import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserInitialStateInterface {
    isAuth: boolean;
    user: User | null;
}

type UserAuthAction = {
    payload: {
        isAuth: boolean;
        user: User;
    }

}

export interface UserAuthSelector {
    auth: UserInitialStateInterface;
}

const initialState = {
    isAuth: false,
    user: null
}


 const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setUserSignUp: (state:UserInitialStateInterface, action: UserAuthAction) => {
            state.isAuth = action.payload.isAuth;
            state.user = Object.assign({}, action.payload.user);
        },
        setUserSignOut: (state:UserInitialStateInterface) => {
            state.isAuth = false;
            state.user = null;
        }
    }
});

export const {setUserSignOut, setUserSignUp} = userAuthSlice.actions;
export default userAuthSlice;