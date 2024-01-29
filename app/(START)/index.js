import { Redirect } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  return (
    <>
      {AsyncStorage.getItem("user") ? (
        <Redirect href={"/(HOME)"} />
      ) : (
        <Redirect href={"/(START)"} />
      )}
    </>
  );
}
