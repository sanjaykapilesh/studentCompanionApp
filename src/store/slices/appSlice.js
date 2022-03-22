import {createAsyncThunk} from '@reduxjs/toolkit/src/createAsyncThunk';
import {handleErpToken, handleUserLogin} from '../../utils/auth';
import {createSlice} from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk('user/login', async data => {
  const response = await handleUserLogin(data);
  // const erpToken = await handleErpToken(data);
  return {...response};
});

const appSlice = createSlice({
  name: 'app',
  initialState: {
    login: {
      roll_number: '',
      password: '',
      erp_token: '',
      commonError: '',
      isLoading: false,
    },
    user: {
      roll_number: '',
      password: '',
      erp_token: '',
    },
  },
  reducers: {
    clearLogin(state, action) {
      state.user = {
        roll_number: '',
        password: '',
        erp_token: '',
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.login.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.login.isLoading = false;
      if (action.payload) {
        // state.login.token = action.payload.token;
        // state.user.token = action.payload.token;

        state.user.roll_number = action.payload.roll_number;
        state.user.password = action.payload.password;
      }
      if (action.payload?.error) {
        state.login.commonError = action.payload.error;
      }
    });
  },
});

export default appSlice.reducer;
export const {clearLogin} = appSlice.actions;
