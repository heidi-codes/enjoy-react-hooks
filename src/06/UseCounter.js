import { useState, useCallback } from "react";

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(count + 1), [count]);
  const decrement = useCallback(() => setCount(count - 1), [count]);
  const reset = useCallback(() => setCount(0), []);

  return { count, increment, decrement, reset };
}

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div>
      <h1>Use Counter</h1>
      <button onClick={decrement}> - </button>
      <span
        style={{ display: "inline-block", width: "40px", textAlign: "center" }}
      >
        {count}
      </span>
      <button onClick={increment}> + </button>
      <button onClick={reset}> reset </button>
    </div>
  );
}
