import React, { createContext, useReducer } from "react";

type InitialState = typeof initalState;

type Action =
  | {
      type: "SET_LOGIN";
      payload: boolean;
    }
  | {
      type: "SET_SHOW_SIDEBAR";
      payload: boolean;
    };

interface ContextProviderProps {
  children: React.ReactNode;
}

const initalState = {
  loggedIn: false,
  showSidebar: false,
};

const reducer = (state: InitialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        loggedIn: payload,
      };
    case "SET_SHOW_SIDEBAR":
      return {
        ...state,
        showSidebar: payload,
      };

    default:
      return state;
  }
};

export const LendsqrContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({ state: initalState, dispatch: () => {} });

export const LendsqrContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <LendsqrContext.Provider value={{ state, dispatch }}>
      {children}
    </LendsqrContext.Provider>
  );
};
