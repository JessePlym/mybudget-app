import { Box, Stack, Heading, Text, Button, FormControl } from "native-base";
import { styles } from "../styles/stylesheet";
import MoneyInput from "../components/MoneyInput";
import { useState } from "react";
import MoneyFlatList from "../components/MoneyFlatList";


export default function IncomePage({ moneyInput, setMoneyInput}) {
  const [moneyList, setMoneyList] = useState([]);
  const [valid, setValid] = useState(true);
  
  const handleAddedMoney = (money) => {
    if (money.amount > 999999999) {
      setValid(false);
    } else if (!isNaN(money.amount) && money.amount.length > 0) {
      setMoneyList([...moneyList, money]);
      setValid(true);
    }
    setMoneyInput({description: "No description", amount: ""});
  }

  return (
    <Box style={styles.container}>
      <Stack space={5} alignItems="center">
        <Heading color="second">My Income</Heading>
        <Heading size="sm" color="second">Your total income 0€</Heading>
        <FormControl isInvalid={!valid}>
          <MoneyInput 
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
