import { useState, useEffect } from "react";

const useFetch = (fetchFn, args) => {
  const [payload, setPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const init = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        setPayload(await fetchFn(args));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [fetchFn, args]);

  return { payload, isLoading, isError };
};

export default useFetch;
