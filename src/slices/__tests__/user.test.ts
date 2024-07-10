import { configureStore } from '@reduxjs/toolkit';
import {
  TUserState,
  loginUser,
  registerUser,
  checkUserAuth,
  logoutUser,
  updateUser,
  userSlice,
  isAuthCheckedSelector,
  userDataSelector,
  userDataNameSelector
} from '../user';
import { RequestStatus, TUser } from '@utils-types';
import { TLoginData, TRegisterData } from '../../utils/burger-api';

describe('[userSlice] срез отвечающий за работу пользователем', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    data: null,
    requestStatus: RequestStatus.Idle
  };

  const userTestResponse: TUser = {
    email: 'andrpre@gmail.com',
    name: 'Andrpre'
  };

  const userTestRequest: TLoginData = {
    email: 'andrpre@gmail.com',
    password: 'password123'
  };

  const userTestRegister: TRegisterData = {
    name: 'Andrpre',
    email: 'andrpre@gmail.com',
    password: 'password123'
  };

  describe('Тесты асинхронных экшенов', () => {
    it('Проверяем значение loading для свойсвта status при отправке loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.isAuthChecked).toBe(false);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке loginUser.fulfilled', () => {
      const expectedState: TUserState = {
        data: userTestResponse,
        isAuthChecked: true,
        requestStatus: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        loginUser.fulfilled(userTestResponse, '', userTestRequest)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке loginUser.rejected', () => {
      const expectedState: TUserState = {
        ...initialState,
        isAuthChecked: true,
        requestStatus: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        loginUser.rejected(new Error('Error'), '', userTestRequest)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Failed);
    });

    it('Проверяем значение loading для свойсвта status при отправке registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.isAuthChecked).toBe(false);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке registerUser.fulfilled', () => {
      const expectedState: TUserState = {
        data: userTestResponse,
        isAuthChecked: true,
        requestStatus: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        registerUser.fulfilled(userTestResponse, '', userTestRegister)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке registerUser.rejected', () => {
      const expectedState: TUserState = {
        ...initialState,
        isAuthChecked: true,
        requestStatus: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        registerUser.rejected(new Error('Error'), '', userTestRegister)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Failed);
    });

    it('Проверяем значение loading для свойсвта status при отправке updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.isAuthChecked).toBe(false);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке updateUser.fulfilled', () => {
      const expectedState: TUserState = {
        data: userTestResponse,
        isAuthChecked: true,
        requestStatus: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        updateUser.fulfilled(userTestResponse, '', userTestRegister)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке updateUser.rejected', () => {
      const expectedState: TUserState = {
        ...initialState,
        isAuthChecked: true,
        requestStatus: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error('Error'), '', userTestRegister)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Failed);
    });

    it('Проверяем значение loading для свойсвта status при отправке checkUserAuth.pending', () => {
      const action = { type: checkUserAuth.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.isAuthChecked).toBe(false);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке checkUserAuth.fulfilled', () => {
      const expectedState: TUserState = {
        data: userTestResponse,
        isAuthChecked: true,
        requestStatus: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        checkUserAuth.fulfilled(userTestResponse, '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке checkUserAuth.rejected', () => {
      const expectedState: TUserState = {
        ...initialState,
        isAuthChecked: true,
        requestStatus: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        checkUserAuth.rejected(new Error('Error'), '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Failed);
    });

    it('Проверяем значение loading для свойсвта status при отправке logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.isAuthChecked).toBe(false);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке logoutUser.fulfilled', () => {
      const expectedState: TUserState = {
        data: null,
        isAuthChecked: true,
        requestStatus: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        logoutUser.fulfilled(undefined, '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке logoutUser.rejected', () => {
      const expectedState: TUserState = {
        ...initialState,
        isAuthChecked: true,
        requestStatus: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        logoutUser.rejected(new Error('Error'), '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.requestStatus).toBe(RequestStatus.Failed);
    });
  });

  describe('Тесты selectors', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      }
    });
    it('Тестируем селектор isAuthCheckedSelector для получения статуса авторизации пользователя', () => {
      const state = store.getState();
      const selectedState = isAuthCheckedSelector(store.getState());

      expect(selectedState).toEqual(state.user.isAuthChecked);
    });

    it('Тестируем селектор userDataSelector для получения информации о пользователе', () => {
      const state = store.getState();
      const selectedState = userDataSelector(store.getState());

      expect(selectedState).toEqual(state.user.data);
    });

    it('Тестируем селектор userDataNameSelector для получения информации о имени пользователя', () => {
      const state = store.getState();
      const selectedState = userDataNameSelector(store.getState());

      expect(selectedState).toEqual(state.user.data?.name);
    });
  });
});
