import { useState, useEffect } from "react";
import axios from "axios";
import { userType } from "@/types/user";

export default function useFetchUser(url: string) {
  const [data, setData] = useState<userType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  async function deleteUser(id: number) {
    try {
      axios.delete(`${url}/${id}`);
      setData((prev) => prev?.filter((user) => user.id !== id) || null);
    } catch (error) {
      setError(error as Error);
    }
  }

  return { data, deleteUser, loading, error };
}
