import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { getCookie, setCookie } from '../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) return data.user;
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) return data.user;
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk('user/checkUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    isAuthCheckedSelector: (sliceState: TUserState) => sliceState.isAuthChecked,
    userDataSelector: (sliceState: TUserState) => sliceState.data,
    userDataNameSelector: (sliceState: TUserState) => sliceState.data?.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.isAuthChecked = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<TUser>) => {
          state.data = payload;
          state.requestStatus = RequestStatus.Success;
          state.isAuthChecked = true;
        }
      )
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.isAuthChecked = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<TUser>) => {
          state.data = payload;
          state.requestStatus = RequestStatus.Success;
          state.isAuthChecked = true;
        }
      )
      .addCase(checkUserAuth.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.isAuthChecked = true;
      })
      .addCase(
        checkUserAuth.fulfilled,
        (state, { payload }: PayloadAction<TUser>) => {
          state.data = payload;
          state.requestStatus = RequestStatus.Success;
          state.isAuthChecked = true;
        }
      );
  }
});

export const { isAuthCheckedSelector, userDataSelector, userDataNameSelector } =
  userSlice.selectors;
export const { authChecked } = userSlice.actions;
