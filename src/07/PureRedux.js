import { useState } from "react";
import { createStore } from "redux";

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

const output = [];
store.subscribe(() => console.log(store.getState()));
store.subscribe(() => output.push(store.getState()));
const incrementAction = { type: "counter/incremented" };

const decrementAction = { type: "counter/decremented" };

export default () => {
  const [, setValue] = useState(true);
  const forceUpdate = () => setValue((v) => !v);
  return (
    <div>
      <button onClick={() => store.dispatch(incrementAction) && forceUpdate()}>
        +
      </button>
      <button onClick={() => store.dispatch(decrementAction) && forceUpdate()}>
        -
      </button>
      <br />
      <textarea
        style={{ height: "500px" }}
        value={output.map((o) => JSON.stringify(o)).join("\n")}
        readOnly
      />
    </div>
  );
};
