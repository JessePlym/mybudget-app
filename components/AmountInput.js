import { Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function AmountInput({ placeholderText, amount, setMoneyInput, moneyInput }) {
  return (
    <Input 
      w="60%"
      placeholder={placeholderText}
      variant="filled"
      borderColor="first"
      borderWidth="4"
      borderRadius="full"
      size="lg"
      keyboardType="numeric"
      value={amount}
      InputRightElement={<Icon 
        as={<MaterialIcons name="euro" />}
        mr="2"
        size={5}
        color="first"
      />}
      onChangeText={newAmount => setMoneyInput({...moneyInput, amount: newAmount})}
    />
  );
}
