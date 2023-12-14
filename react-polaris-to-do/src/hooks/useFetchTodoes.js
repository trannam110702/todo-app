import { useCallback, useEffect, useState } from "react";
import fetchTodoApi from "../api/todoApi";
const useFetchTodoes = () => {
  const [todoes, setTodoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAllTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchTodoApi("todoes");
      if (res.ok) {
        const data = (await res.json()).data;
        setTodoes(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAllTodos();
  }, []);
  return { todoes, setTodoes, loading, setLoading, fetchAllTodos };
};

export default useFetchTodoes;
