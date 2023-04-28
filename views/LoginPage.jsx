import { useEffect, useState } from "react";
import { Box, Text, Input, Icon, Stack, Button } from "native-base";
import { Alert } from "react-native";
import { styles } from "../styles/stylesheet";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage({ setLoggedIn, database }) {
  const [credentials, setCredentials] = useState({username: "", password: ""});

  const getUserData = (username, password) => {
    database.transaction(tx => {
      tx.executeSql('select * from user where username = ? and password = ?;', [username, password], (_, { rows }) => {
        logIn(rows._array);
      });
    });
  }

  const logIn = async (data) => {
    if (data.length !== 0) {
      try {
        await AsyncStorage.setItem("loggedIn", JSON.stringify(true));
        setLoggedIn(true);
      } catch (e) {
        Alert.alert("Failed to set item");
      }
    } else {
      Alert.alert("Bad credentials!");
    }
  }

  return (
    <Box style={styles.container}>
      <Stack space={2} alignItems="center">
        <Text color="second" fontSize={28} >Log in</Text>
        <UsernameInput 
          {...credentials} setCredentials={setCredentials}/>
        <PasswordInput 
          placeholder="Password"
          {...credentials}
          setCredentials={setCredentials}
        />
        <Button 
          _pressed={{ opacity: 0.5 }}
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={() => getUserData(credentials.username, credentials.password)}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  )
}
