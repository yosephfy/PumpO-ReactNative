import { useNavigation } from "expo-router";
import React from "react";
import Background from "../../src/components/Background";
import Button from "../../src/components/Button";
import Header from "../../src/components/Header";
import Logo from "../../src/components/Logo";
import Paragraph from "../../src/components/Paragraph";

export default function StartScreen({ navigation }) {
  const { navigate } = useNavigation();
  return (
    <Background>
      <Logo />
      <Header>PumpO</Header>
      <Paragraph>
        Step into the Lift Life Community! PumpO is your ultimate social hub for
        bodybuilders, powerlifters, and gym lovers. Join the squad now!
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
