import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

export const initialState: TUserState = {
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
  if (document.cookie.indexOf('accessToken')) {
    return rejectWithValue('User is not authorized');
  }
  const data = await getUserApi();
  return data.user;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await updateUserApi({ email, name, password });
    return data.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (sliceState: TUserState) => sliceState.isAuthChecked,
    userDataSelector: (sliceState: TUserState) => sliceState.data,
    userDataNameSelector: (sliceState: TUserState) => sliceState.data?.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isAuthChecked = false;
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
        state.isAuthChecked = false;
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
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isAuthChecked = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.isAuthChecked = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<TUser>) => {
          state.data = payload;
          state.requestStatus = RequestStatus.Success;
          state.isAuthChecked = true;
        }
      )
      .addCase(checkUserAuth.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isAuthChecked = false;
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
      )
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      });
  }
});

export const { isAuthCheckedSelector, userDataSelector, userDataNameSelector } =
  userSlice.selectors;
function rejectWithValue(arg0: string): any {
  throw new Error('Function not implemented.');
}
