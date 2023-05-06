import { Input, Icon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons";

export default function PasswordInput({ placeholder, password, passwordCheck, setCredentials }) {

  const handlePasswordChange = (text) => {
    if (placeholder === "Password") {
      setCredentials(prev => ({...prev, password: text}));
    } else {
      setCredentials(prev => ({...prev, passwordCheck: text}));
    }
  }

  return (
    <Input 
      type="password"
      placeholder={placeholder}
      w="80%"
      size="lg"
      variant="filled"
      borderWidth="4"
      borderRadius="full"
      borderColor="first"
      InputLeftElement={<Icon 
        as={<MaterialIcons name="visibility" />}
        ml="2"
        size={5}
        color="first"
      />}
      value={placeholder === "Password" ? password : passwordCheck}
      onChangeText={text => handlePasswordChange(text)}
    />
  )
}
