import React, { useEffect, useState } from "react";
import { token } from "../../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          console.log(!res.ok, "111");
          throw new Error(result.message + "😶‍🌫️");
        }

        setData(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.log(error.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
