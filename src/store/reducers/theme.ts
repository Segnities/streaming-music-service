import { createSlice } from "@reduxjs/toolkit";


const initialState: InitialStateInterface = {
    theme: "dark",
}

export interface InitialStateInterface {
    theme: "dark" | "light";
}


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state: InitialStateInterface) => {
            if (state.theme === 'dark') {
                state.theme = 'light';
            } else {
                state.theme = 'dark';
            }
        }
    }
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice;