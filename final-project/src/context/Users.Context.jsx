import React, { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../services/users.services";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>;
};
