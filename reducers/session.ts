import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logoutUser } from '../actions/common';

interface UserProfile {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SessionState {
  isSignedIn: boolean;
  currentUser: UserProfile | null;
  userData: UserProfile[];
}

const initialState: SessionState = {
  isSignedIn: false,
  currentUser: null,
  userData: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProfile>) => {
      if (!state.userData) state.userData = [];

      // Check if user already exists based on email
      const userExists = state.userData.some(user => user.email === action.payload.email);

      if (!userExists) {
        state.userData = [...state.userData, action.payload];
        console.log("add user ==", [...state.userData, action.payload]);
      } else {
        console.warn("User with this email already exists!");
      }
    },
    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      if (!state.userData) state.userData = [];

      const user = state.userData.find(user => user.email === action.payload.email);

      if (user && user.password === action.payload.password) {
        state.isSignedIn = true;
        state.currentUser = user;
      }
    },
    updateUser: (state, action: PayloadAction<Partial<UserProfile> & { email: string }>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
      state.userData = state.userData.map(user =>
        user.email === action.payload.email ? { ...user, ...action.payload } : user
      );
      console.log("current user", JSON.stringify(state.userData, null, 2));
    },
    logout: (state) => {
      state.isSignedIn = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, (state) => {
      state.isSignedIn = false;
      state.currentUser = null;
      state.userData = [];
    });
  },
});

export const { addUser, loginUser, updateUser, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
