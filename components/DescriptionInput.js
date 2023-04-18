import { Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function DescriptionInput({ placeholderText, description, setMoneyInput, moneyInput }) {

  return (
    <Input 
      w="60%"
      placeholder={placeholderText}
      variant="rounded"
      borderColor="first"
      borderWidth="4"
      size="lg"
      value={description}
      InputRightElement={<Icon 
        as={<MaterialIcons name="euro" />}
        mr="2"
        size={5}
        color="first"
      />}
      onChangeText={newDesc => setMoneyInput({...moneyInput, description: newDesc})}
    />
  );
}