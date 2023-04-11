import { createSlice } from "@reduxjs/toolkit";
interface UserInitialStateInterface {
    isAuth: boolean;
    user: string | null;
}

type UserAuthAction = {
    payload: {
        user: string;
    }

}

export interface UserAuthSelector {
    userAuth: UserInitialStateInterface;
}

const initialState = {
    isAuth: false,
    user: null
};


const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setUserSignUp: (state: UserInitialStateInterface, action: UserAuthAction) => {
            state.isAuth = true;
            state.user = action.payload.user;
        },
        setUserSignOut: (state: UserInitialStateInterface) => {
            state.isAuth = false;
            state.user = null;
        },
        changeIsAuth: (state: UserInitialStateInterface, action: { payload: boolean }) => {
            state.isAuth = action.payload;
        }
    }
});

export const { setUserSignOut, setUserSignUp, changeIsAuth } = userAuthSlice.actions;
export default userAuthSlice;