import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Background from "../../src/components/Background";
import Logo from "../../src/components/Logo";
import Header from "../../src/components/Header";
import Button from "../../src/components/Button";
import Paragraph from "../../src/components/Paragraph";
import BackButton from "../../src/components/BackButton";
import { theme } from "../../src/core/theme";
import { emailValidator } from "../../src/helpers/emailValidator";
import { passwordValidator } from "../../src/helpers/passwordValidator";
import { useNavigation } from "expo-router";

export default function StartScreen({ navigation }) {
  const { navigate } = useNavigation();
  return (
    <Background>
      <Logo />
      <Header>PumpO</Header>
      <Paragraph>
        Step into the Lift Life Community! PumpO is your ultimate social hub for
        bodybuilders, powerlifters, and gym lovers. Join the squad now!{" "}
      </Paragraph>
      <Button mode="contained" onPress={() => navigate("LoginScreen")}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigate("RegisterScreen")}>
        Sign Up
      </Button>
    </Background>
  );
}
