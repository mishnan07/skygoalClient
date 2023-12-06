// ClientAuth.js
import { createSlice } from "@reduxjs/toolkit";

export const ClientAuth = createSlice({
  name: 'Client',
  initialState: {
    Token: null,
    Id: null,
    Online: false
  },
  reducers: {
    ClientLogin(state, action) {
      state.Token = action.payload.token;
      state.Online = true;
    },
    ClientLogout(state, action) {
      state.Online = false;
      state.Token = '';
    },
    ClientId(state, action) {
      state.Id = action.payload.id;
    },
  },
});

export const { ClientLogin, ClientLogout, ClientId } = ClientAuth.actions;
export default ClientAuth.reducer;
