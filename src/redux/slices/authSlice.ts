import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  isAdmin: boolean;
  rol: "usuario" | "guia" | "admin" | null;
}

const initialState: AuthState = {
  email: null,
  isAdmin: false,
  rol: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        email: string;
        isAdmin: boolean;
        rol: "usuario" | "guia" | "admin";
      }>
    ) => {
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.rol = action.payload.rol;
    },
    logoutUser: (state) => {
      state.email = null;
      state.isAdmin = false;
      state.rol = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
