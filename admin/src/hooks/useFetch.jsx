import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  // Global State variables for fetching array data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect
  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const {data} = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchingData();
  }, [url]);

  // Function to refetch data
  const reFetching = async () => {
    setLoading(true);
    try {
      const {data} = await axios.get(url);
      setData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return {data, loading, error, reFetching}
};

export default useFetch;
