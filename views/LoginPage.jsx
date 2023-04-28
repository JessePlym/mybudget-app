import { useState } from "react";
import { Box, Text, Input, Icon, Stack, Button } from "native-base";
import { styles } from "../styles/stylesheet";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage({ setLoggedIn }) {
  const [credentials, setCredentials] = useState({username: "", password: "", passwordCheck: ""});

  const logIn = () => {
    setLoggedIn(true);
  }

  return (
    <Box style={styles.container}>
      <Stack space={2} alignItems="center">
        <Text color="second" fontSize={28} >Register</Text>
        <UsernameInput 
          {...credentials} setCredentials={setCredentials}/>
        <PasswordInput placeholder="Password" />
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
      </Stack>
    </Box>
  )
}
