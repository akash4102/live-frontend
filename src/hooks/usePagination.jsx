import { useState, useEffect } from "react";
import axios from "axios";

export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [users, setUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const fetchUsers = async (page, limit) => {
    try {
      const response = await axios.get(`/api/users`, {
        params: { page, limit },
      });
      setUsers(response.data.users);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  return {
    users,
    totalRows,
    page,
    limit,
    setPage,
    setLimit,
  };
};
