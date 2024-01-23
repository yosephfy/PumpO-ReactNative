import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
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

export default function LoginScreen() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { navigate } = useNavigation();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    navigate("(HOME)", {});
  };

  return (
    <Background>
      <BackButton goBack={() => navigate(-1, {})} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigate("ResetPasswordScreen", {})}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigate("RegisterScreen", {})}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
