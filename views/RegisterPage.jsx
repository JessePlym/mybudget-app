import { useState } from "react";
import { Box, Text, Input, Icon, Stack, Button, FormControl } from "native-base";
import { Alert } from "react-native";
import { styles } from "../styles/stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";

export default function RegisterPage({ setLoggedIn, database, showError, navigation }) {

  const [credentials, setCredentials] = useState({username: "", password: "", passwordCheck: ""});
  const [validPassword, setValidPassword] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const validateCredentials = () => {
    setPasswordMatch(true);
    setValidPassword(true);
    if (credentials.password.length < 8) {
      setValidPassword(false);
      return false;
    } else if (credentials.passwordCheck !== credentials.password) {
      setPasswordMatch(false);
      return false;
    } else {
      setValidPassword(true);
      setPasswordMatch(true);
      return true
    }
  }

  const logIn = async () => {
    if (validateCredentials()) {
      try {
        await AsyncStorage.setItem("loggedIn", JSON.stringify(true));
        setLoggedIn(true);
        saveUser()
      } catch (e) {
        Alert.alert("Failed to set item");
      }
    }
  }

  const saveUser = () => {  
    database.transaction(tx => {
      tx.executeSql('insert into user (username, password) values (?, ?);', 
        [credentials.username, credentials.password]);
    }, () => showError("Data not saved!"), null);
  }


  return (
    <Box style={styles.container}>
      <Stack space={2} alignItems="center">
        <Text color="second" fontSize={28} >Register</Text>
        <UsernameInput 
          {...credentials} setCredentials={setCredentials}/>
        <FormControl isInvalid={!validPassword}>
          <PasswordInput 
            placeholder="Password"
            {...credentials}
            setCredentials={setCredentials}
          />
          <FormControl.ErrorMessage>Password must be at least 8 characters long!</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!passwordMatch}>
          <PasswordInput 
            placeholder="Password again"
            {...credentials}
            setCredentials={setCredentials}
          />
          <FormControl.ErrorMessage>Password does not match!</FormControl.ErrorMessage>
        </FormControl>
        <Button 
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={() => logIn()}
        >
          Sign Up
        </Button>
        <Button 
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          _pressed={{ opacity: 0.5 }}
          onPress={() => navigation.navigate("Login")}
        >
          Login with account
        </Button>
      </Stack>
    </Box>
  );
}