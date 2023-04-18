import { Box, Stack, Heading, Text, Button, FormControl } from "native-base";
import { styles } from "../styles/stylesheet";
import AmountInput from "../components/AmountInput";
import { useState } from "react";
import MoneyFlatList from "../components/MoneyFlatList";
import DescriptionInput from "../components/DescriptionInput";


export default function IncomePage({ moneyInput, setMoneyInput}) {
  const [moneyList, setMoneyList] = useState([]);
  const [validDesc, setValidDesc] = useState(true);
  const [validAmount, setValidAmount] = useState(true);

  const handleAddedMoney = (money) => {
    if (money.description.length > 18) {
      setValidDesc(false);
    }
    if (money.amount > 999999999) {
      setValidAmount(false);
    } else if (!isNaN(money.amount) && money.amount.length > 0) {
      setMoneyList([...moneyList, money]);
      setValidDesc(true);
      setValidAmount(true);
    }
    setMoneyInput({description: "", amount: ""});
  }

  return (
    <Box style={styles.container}>
      <Stack space={5} alignItems="center">
        <Heading color="second">My Income</Heading>
        <Heading size="sm" color="second">Your total income 0€</Heading>
        <FormControl isInvalid={!validDesc}>
          <DescriptionInput 
            placeholderText="Add description"
            description={moneyInput.description}
            setMoneyInput={setMoneyInput}
            moneyInput={moneyInput}
          />
          <FormControl.ErrorMessage>Description is too long!</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!validAmount}>
          <AmountInput 
            placeholderText="Add new income"
            amount={moneyInput.amount}
            setMoneyInput={setMoneyInput}
            moneyInput={moneyInput}
          />
          <FormControl.ErrorMessage>Max amount is 999999999€</FormControl.ErrorMessage>
        </FormControl>
        <Button 
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={() => handleAddedMoney(moneyInput)}
        >
          Add
        </Button>
        <MoneyFlatList moneyList={moneyList}/>
      </Stack>
    </Box>
  )
}
