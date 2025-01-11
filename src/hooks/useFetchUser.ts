import { useState, useEffect } from "react";
import axios from "axios";
import { userType } from "@/types/user";


export default function useFetchUser(url:string) {
    
  const [data, setData] = useState<userType[] | null>(null);
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
  }, []);

  return { data, loading, error };
}
