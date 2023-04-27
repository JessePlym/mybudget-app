import { Input, Icon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons";

export default function PasswordInput({ placeholder }) {
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
    />
  )
}
