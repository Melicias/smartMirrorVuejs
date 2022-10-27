import { createStore, createLogger } from "vuex";

import {
  AuthModule,
  Store as AuthStore,
  State as AuthState,
} from "@/store/socket/socket_store_index";

export type State = {
  auth: AuthState;
};

export type Store = AuthStore<Pick<State, "auth">>;

export const store = createStore({
  plugins: process.env.NODE_ENV === "production" ? [] : [createLogger()],
  modules: { AuthModule },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
