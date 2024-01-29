import { Redirect } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../src/context/AuthContext";

export default function index() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <Redirect href={"/(HOME)"} />
      ) : (
        <Redirect href={"/(START)/StartScreen"} />
      )}
    </>
  );
}
