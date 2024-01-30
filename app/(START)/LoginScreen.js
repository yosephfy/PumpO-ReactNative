import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
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
import { useNavigation, useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import { nameValidator } from "../../src/helpers/nameValidator";
import { asyncCallWithTimeout } from "../../src/utility/utility";

export default function LoginScreen() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [err, setErr] = useState(null);
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const onLoginPressed = async () => {
    //const emailError = emailValidator(email.value);
    const usernameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const loginObj = { username: username.value, password: password.value };

    asyncCallWithTimeout(login(loginObj), 2000)
      .then((res) => {
        router.replace("(HOME)");
        console.log(res.data, "YO");
      })
      .catch((error) => setErr(JSON.stringify(error)));

    //navigate("(HOME)", {});
  };

  const onLoginPressedADMIN = async () => {
    //const emailError = emailValidator(email.value);

    const loginObj = { username: "awrate3", password: "123456" };

    asyncCallWithTimeout(login(loginObj), 2000)
      .then((res) => {
        router.replace("(HOME)");
        console.log(res.data, "YO");
      })
      .catch((error) => setErr(JSON.stringify(error)));

    //navigate("(HOME)", {});
  };

  return (
    <Background>
      <BackButton goBack={() => router.back()} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="text"
        textContentType="username"
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
        <TouchableOpacity
          onPress={() => router.push("ResetPasswordScreen", {})}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.errorMessage}>{err && err}</Text>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <Button mode="contained" onPress={onLoginPressedADMIN}>
        Login ADMIN
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("RegisterScreen", {})}>
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
  errorMessage: {
    color: theme.colors.error,
    marginBottom: 5,
  },
});
