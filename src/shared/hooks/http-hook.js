import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  const sendRequest = useCallback(
    async (url, method = "get", data = null, headers = null) => {
      setError(null);
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await axios({
          url,
          method,
          data,
          headers,
          signal: httpAbortCtrl.signal,
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        setIsLoading(false);
        setPageLoaded(true)
        return response;
      } catch (err) {
        setIsLoading(false);
        setPageLoaded(true)
        console.log(err);
        if (err.response) {
          setError(err.response.data.message);
        }
        throw err;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { pageLoaded, isLoading, error, sendRequest, clearError };
};
