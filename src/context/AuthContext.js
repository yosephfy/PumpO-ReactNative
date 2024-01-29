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
  }, []);

  const login = (inputs) =>
    makeRequest.post(apiCalls().auth.add.login, inputs).then((res) => {
      setCurrentUser(res.data);
      AsyncStorage.setItem("user", JSON.stringify(res.data))
        .then((res) => console.log("User Logged IN"))
        .catch((err) => console.error("Error Logging User", err));
    });

  const loginn = (inputs) => {
    let timeoutHandle;

    const timeoutPromise = new Promise((_resolve, reject) => {
      timeoutHandle = setTimeout(
        () => reject(new Error("Async call timeout limit reached")),
        3000
      );
    });
    return new Promise(async () => {
      const result = await Promise.race([
        makeRequest.post(apiCalls().auth.add.login, inputs).then((res) => {
          setCurrentUser(res.data);
          AsyncStorage.setItem("user", JSON.stringify(res.data))
            .then((res_1) => {
              console.log("User Logged IN");
            })
            .catch((err) => console.error("Error Logging User", err));
        }),
        ,
        timeoutPromise,
      ]);
      clearTimeout(timeoutPromise);
      return result;
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
