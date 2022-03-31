import React, { createContext, useContext, useReducer } from "react";

type StateType = "visible" | "active" | "hidden";

type ActionType = "active" | "show" | "hide";

const initialState: StateType = "hidden";

const reducer = (state: StateType, action: ActionType) => {
  switch (action) {
    case "active":
      return "active";
    case "hide":
      return "hidden";
    case "show":
      return "visible";
    default:
      return state;
  }
};

type DeleteIndicatorContextType = {
  state: StateType;
  dispatch: Partial<React.Dispatch<ActionType>>;
};

export const DeleteIndicatorContext = createContext<DeleteIndicatorContextType>(
  {
    state: "hidden",
    dispatch: {},
  }
);

export const DeleteIndicatorProvider: React.FunctionComponent = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DeleteIndicatorContext.Provider value={{ state, dispatch }}>
      {children}
    </DeleteIndicatorContext.Provider>
  );
};

const useDeleteIndicator = () => {
  const { dispatch } = useContext(DeleteIndicatorContext);

  const hideDeleteIndicator = () => {
    if (typeof dispatch === "function") {
      dispatch("hide");
    }
  };

  const showDeleteIndicator = () => {
    if (typeof dispatch === "function") {
      dispatch("show");
    }
  };

  const activeDeleteIndicator = () => {
    if (typeof dispatch === "function") {
      dispatch("active");
    }
  };

  return {
    activeDeleteIndicator,
    hideDeleteIndicator,
    showDeleteIndicator,
  };
};

export default useDeleteIndicator;
