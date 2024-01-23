import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import MyButton from "../../src/components/MyButton";
import { Redirect } from "expo-router";

export default function index() {
  return <Redirect href={"StartScreen"} />;
}
