import { useEffect } from "react";
import { Box, Stack, Heading, Text, Button, FormControl, Icon } from "native-base";
import { styles } from "../styles/stylesheet";
import AmountInput from "../components/AmountInput";
import { useState } from "react";
import MoneyFlatList from "../components/MoneyFlatList";
import DescriptionInput from "../components/DescriptionInput";
import { MaterialIcons } from "@expo/vector-icons";
import DateInput from "../components/DateInput";

export default function IncomePage({ moneyInput, setMoneyInput}) {
  const [moneyList, setMoneyList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [validDesc, setValidDesc] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  // from db later
  useEffect(() => {
    let totalIncome = 0;
    moneyList.forEach(element => totalIncome += Number(element.amount));
    setTotalIncome(totalIncome);
  }, [moneyList])

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
    setMoneyInput({description: "", amount: "", date: new Date()});
  }

  return (
    <Box style={styles.container}>
      <Stack space={5} alignItems="center">
        <Heading color="second">My Income</Heading>
        <Heading size="sm" color="second">Your total income {totalIncome.toFixed(2).replace(".", ",")}€</Heading>
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
        <FormControl>
          <Button
            backgroundColor="second"
            color="third"
            size="lg"
            borderRadius="full"
            w="50%"
            rightIcon={<Icon 
              as={<MaterialIcons name="date-range" />}
              mr="2"
              size={5}
              color="third"
            />}
            onPress={() => setShowCalendar(true)}   
          >
            Select date
          </Button>
          {showCalendar && 
            <DateInput 
              moneyInput={moneyInput}
              setShowCalendar={setShowCalendar}
              setMoneyInput={setMoneyInput}
            />
          }
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
