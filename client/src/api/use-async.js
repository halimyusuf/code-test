import { useCallback, useState } from "react";

// handles asynchronous calls
function useAsync(initialState) {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const { data, error, status } = state;

  const run = useCallback(
    (promise) => {
      setState({ data: null, error: null, status: "pending" });
      if (!promise) {
        setState({ data: null, error: null, status: "resolved" });
      }
      promise?.then(
        (data) => {
          setState({ status: "resolved", data, error: null });
        },
        (error) => {
          setState({ data: null, status: "error", error });
        }
      );
    },
    [setState]
  );

  const setData = useCallback(
    (data) => setState({ status: "resolved", data, error: null }),
    [setState]
  );
  const setError = useCallback(
    (error) => setState({ status: "error", error, data: null }),
    [setState]
  );

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
}

export { useAsync };
