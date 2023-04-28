import { Input, Icon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons";

export default function UsernameInput({ username, credentials, setCredentials }) {
  return (
    <Input
      placeholder="Username"
      w="80%"
      size="lg"
      variant="filled"
      borderWidth="4"
      borderRadius="full"
      borderColor="first"
      InputLeftElement={<Icon 
        as={<MaterialIcons name="person" />}
        ml="2"
        size={5}
        color="first"
      />}
      value={username}
      onChangeText={text => setCredentials(prev => ({...prev, username: text}))}
    />
  )
}
