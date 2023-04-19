import { Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function DescriptionInput({ placeholderText, description, setMoneyInput, moneyInput }) {

  return (
    <Input 
      w="60%"
      placeholder={placeholderText}
      variant="filled"
      borderColor="first"
      borderWidth="4"
      borderRadius="full"
      size="lg"
      value={description}
      InputRightElement={<Icon 
        as={<MaterialIcons name="description" />}
        mr="2"
        size={5}
        color="first"
      />}
      onChangeText={newDesc => setMoneyInput(prev => ({...prev, description: newDesc}))}
    />
  );
}