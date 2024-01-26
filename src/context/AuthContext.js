import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios.js";
import { apiCalls } from "../utility/Enums";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    username: "hmeagh5",
    password: "123456",
  });

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((res) => {
        setCurrentUser(JSON.parse(res));
      })
      .catch((err) => {
        Alert.alert(JSON.stringify(err));
      });
  });

  const login = async (inputs) =>
    makeRequest.post(apiCalls().auth.add.login, inputs).then((res) => {
      setCurrentUser(res.data);
      AsyncStorage.setItem("user", JSON.stringify(res.data))
        .then((res) => Alert.alert(JSON.stringify(res.data)))
        .catch((err) => Alert.alert(JSON.stringify(err)));
    });

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
