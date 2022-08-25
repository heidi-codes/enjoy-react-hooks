import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

const Counter = () => {
  const count = useSelector((state) => state.value);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux Counter</h1>
      <button onClick={() => dispatch({ type: "counter/decremented" })}>
        -
      </button>
      <span
        style={{ width: "50px", display: "inline-block", textAlign: "center" }}
      >
        {count}
      </span>
      <button onClick={() => dispatch({ type: "counter/incremented" })}>
        +
      </button>
    </div>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};
