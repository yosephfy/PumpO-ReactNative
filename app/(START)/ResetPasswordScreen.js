import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Background from "../../src/components/Background";
import Logo from "../../src/components/Logo";
import Header from "../../src/components/Header";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import BackButton from "../../src/components/BackButton";
import { theme } from "../../src/core/theme";
import { emailValidator } from "../../src/helpers/emailValidator";
import { passwordValidator } from "../../src/helpers/passwordValidator";
import { useNavigation } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const { navigate } = useNavigation();

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    navigate("LoginScreen");
  };

  return (
    <Background>
      <BackButton goBack={() => navigate(-1)} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  );
}
