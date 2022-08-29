import {
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  useReducer,
} from "react";

const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

function useSafeDispatch(dispatch) {
  const mounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "error": {
      return { status: "error", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// handles asynchronous calls
function useAsync(initialState) {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    (promise) => {
      dispatch({ type: "pending" });
      if (!promise) {
        dispatch({ type: "resolved" });
      }
      promise?.then(
        (data) => {
          dispatch({ type: "resolved", data });
        },
        (error) => {
          dispatch({ type: "error", error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback(
    (data) => dispatch({ type: "resolved", data }),
    [dispatch]
  );
  const setError = useCallback(
    (error) => dispatch({ type: "error", error }),
    [dispatch]
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
