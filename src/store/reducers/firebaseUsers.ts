import { createSlice } from "@reduxjs/toolkit";

import { UserDoc } from "../../utils/getUsers";
interface InitialStateInterface {
    firebaseUsers: UserDoc[];
}

export interface FirebaseUsersSelectorInterface {
    firebaseUsers: InitialStateInterface;
}

const initialState: InitialStateInterface = {
    firebaseUsers: []
}

const firebaseUsersSlice = createSlice({
    name: "firebaseUsers",
    initialState,
    reducers: {
        setFirebaseUsers: (state, action) => {
            state.firebaseUsers = action.payload;
        }
    }
});

export const { setFirebaseUsers } = firebaseUsersSlice.actions;
export default firebaseUsersSlice;


