import { useCallback, useEffect, useState } from "react";
import fetchTodoApi from "../api/todoApi";
const useFetchData = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchTodoApi(endpoint);
      if (res.ok) {
        const jsonData = (await res.json()).data;
        console.log(jsonData);
        setData(jsonData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAllData();
  }, []);
  return {
    data,
    setData,
    loading,
    setLoading,
    fetchAllData,
  };
};

export default useFetchData;
