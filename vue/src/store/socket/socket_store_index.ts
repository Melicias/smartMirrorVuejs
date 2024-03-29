import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree,
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";

import socket from "../../services/socket";
import store, { State as RootState } from "@/store";

// Declare state
export type State = {
  isConnected: boolean;
  authUser: string;
  swiping: { movement: number; t_ms: number | null } | null;
};
export type Payload = {
  data: any;
};

// Create initial state
const state: State = {
  isConnected: false,
  authUser: "",
  swiping: null,
};

// mutations enums
export enum MutationTypes {
  SET_SOCKET_CONNECTION = "SET_SOCKET_CONNECTION",
  SET_AUTH_USER = "SET_AUTH_USER",
  SET_SWIPING = "SET_SWIPING",
}

// Mutation contracts
export type Mutations<S = State, P = Payload> = {
  [MutationTypes.SET_SOCKET_CONNECTION](state: S): void;
  [MutationTypes.SET_AUTH_USER](state: S, payload: P): void;
  [MutationTypes.SET_SWIPING](state: S, payload: P): void;
};
// Define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SOCKET_CONNECTION](state: State) {
    state.isConnected = true;
  },
  [MutationTypes.SET_AUTH_USER](state: State, payload: Payload) {
    console.log(payload);
    state.authUser = payload.toString();
  },
  [MutationTypes.SET_SWIPING](state: State, payload: any) {
    console.log(payload);
    state.swiping = {
      movement: +payload.movement,
      t_ms: +payload.movement,
    };
  },
};

// Action enums
export enum ActionTypes {
  CONNECT = "CONNECT",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_SWIPING = "UPDATE_SWIPING",
}

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

// Actions contracts
export interface Actions {
  [ActionTypes.CONNECT](
    { commit }: AugmentedActionContext,
    payload: { username: string; password: string }
  ): void;
  [ActionTypes.UPDATE_USER](
    { commit }: AugmentedActionContext,
    payload: { username: string }
  ): void;
  [ActionTypes.UPDATE_SWIPING](
    { commit }: AugmentedActionContext,
    payload: { swiping: number }
  ): void;
}

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.CONNECT](
    { commit },
    payload: { username: string; password: string }
  ) {
    try {
      socket.connect();
      store.dispatch("UPDATE_SWIPING");
      socket.on("NEW_RECOGNIZED_USER", (data) => {
        store.dispatch("UPDATE_USER", data);
        store.dispatch("UPDATE_SWIPING");
      });
      store.commit("SET_SOCKET_CONNECTION");
    } catch (err) {
      // some error handling logic
    }
  },
  async [ActionTypes.UPDATE_USER]({ commit }, payload: { username: string }) {
    try {
      store.commit("SET_AUTH_USER", payload);
    } catch (err) {
      // some error handling logic
    }
  },
  async [ActionTypes.UPDATE_SWIPING]({ commit }, payload: { swiping: number }) {
    try {
      console.log("handTrackUpaUPa");
      socket.on("HAND_TRACK", (data) => {
        store.commit("SET_SWIPING", data);
      });
    } catch (err) {
      // some error handling logic
    }
  },
};

// getters types
export type Getters = {
  isConnected(state: State): boolean;
  authUser(state: State): string;
  swiping(state: State): { movement: number; t_ms: number | null } | null;
};

// getters
export const getters: GetterTree<State, RootState> & Getters = {
  isConnected: (state) => {
    return state.isConnected;
  },
  authUser: (state) => {
    return state.authUser;
  },
  swiping: (state) => {
    return state.swiping;
  },
};

//setup store type
export type Store<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const AuthModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
  // Namespacing Vuex modules is tricky and hard to type check with typescript.
  // Instead of namespacing, we could create our own namespacing mechanism by
  // prefixing the value of the TypeScript enum with the namespace, e.g.
  // enum TodoActions {
  //   AddTodo = 'TODO__ADD_TODO'
  // }
  // namespaced: true,
};
