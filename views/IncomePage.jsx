import { useEffect } from "react";
import { Box, Stack, Heading, Select, Button, FormControl, Icon, CheckIcon } from "native-base";
import { styles } from "../styles/stylesheet";
import AmountInput from "../components/AmountInput";
import { useState } from "react";
import MoneyFlatList from "../components/MoneyFlatList";
import DescriptionInput from "../components/DescriptionInput";
import { MaterialIcons } from "@expo/vector-icons";
import DateInput from "../components/DateInput";
import moment from "moment/moment";

export default function IncomePage({ moneyList, setMoneyList, saveItem, deleteItem }) {
  const [moneyInput, setMoneyInput] = useState({description: "", amount: "", date: moment(new Date()).format()});
  const [totalIncome, setTotalIncome] = useState(0);
  const [validDesc, setValidDesc] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [errorMsg, setErrorMsg] = useState({descError: "", amountError: ""});
  const [showCalendar, setShowCalendar] = useState(false);
  const [chosenMonth, setChosenMonth] = useState(moment().format("MMMM")); // name of the current month

  // from db later
  useEffect(() => {
    let totalIncome = 0;
    moneyList.forEach(element => totalIncome += Number(element.amount));
    setTotalIncome(totalIncome);
  }, [moneyList])

  const handleAddedMoney = (money) => {
    if (money.description.length > 18) {
      setErrorMsg({...errorMsg, descError: "Description is too long!"});
      setValidDesc(false);
    } 
    if (money.amount > 999999999) {
      setErrorMsg({...errorMsg, amountError: "Max amount is 999999999€"});
      setValidAmount(false);
    } else if (money.amount.length === 0) {
      setErrorMsg({...errorMsg, amountError: "Amount is empty"});
      setValidAmount(false);
    } else if (!isNaN(money.amount)) {
      saveItem(money, "income");
      setMoneyList([...moneyList, money]);
      setValidDesc(true);
      setValidAmount(true);
    }
    setMoneyInput({description: "", amount: "", date: moment(new Date()).format()});
  }

  return (
    <Box style={styles.container}>
      <Stack space={5} alignItems="center" style={{ marginTop: 15}}>
        <Heading size="sm" color="second">Your total income {totalIncome.toFixed(2).replace(".", ",")}€</Heading>
        <FormControl isInvalid={!validDesc}>
          <DescriptionInput 
            placeholderText="Add description"
            description={moneyInput.description}
            setMoneyInput={setMoneyInput}
            moneyInput={moneyInput}
          />
          <FormControl.ErrorMessage>{errorMsg.descError}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!validAmount}>
          <AmountInput 
            placeholderText="Add new income"
            amount={moneyInput.amount}
            setMoneyInput={setMoneyInput}
            moneyInput={moneyInput}
          />
          <FormControl.ErrorMessage>{errorMsg.amountError}</FormControl.ErrorMessage>
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
        <MoneyFlatList moneyList={moneyList} chosenMonth={chosenMonth} deleteItem={deleteItem}/>
        <Select
          placeholder="Change Month"
          minWidth="200"
          color="second"
          borderRadius="full"
          borderColor="first"
          borderWidth="4"
          size="lg"
          variant="filled"
          selectedValue={chosenMonth}
          onValueChange={monthValue => setChosenMonth(monthValue)}
          _selectedItem={{ endIcon: <CheckIcon size={6} color="first"/>}}
        >
          {moment.months().map((month, index) => (
            <Select.Item key={index} label={month} value={month}/>
          ))}
        </Select>
      </Stack>
    </Box>
  )
}
