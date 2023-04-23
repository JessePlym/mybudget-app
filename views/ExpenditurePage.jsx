import { useState, useEffect } from "react";
import { Box, Stack, Heading, Select, Button, FormControl, Icon, CheckIcon } from "native-base";
import DescriptionInput from "../components/DescriptionInput";
import AmountInput from "../components/AmountInput";
import DateInput from "../components/DateInput";
import MoneyFlatList from "../components/MoneyFlatList";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles/stylesheet";
import moment from "moment/moment";

export default function ExpenditurePage({ expenseList, setExpenseList, saveItem }) {
  const [moneyInput, setMoneyInput] = useState({description: "", amount: "", date: moment(new Date()).format()});
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [validDesc, setValidDesc] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [chosenMonth, setChosenMonth] = useState(moment().format("MMMM")); // name of the current month

  useEffect(() => {
    let totalExpenses = 0;
    let expensesOfMonth = expenseList.filter(expense => moment(expense.date).format("MMMM") === chosenMonth);
    expensesOfMonth.forEach(expense => totalExpenses += Number(expense.amount));
    setTotalExpenses(totalExpenses);
  }, [chosenMonth, expenseList])

  const handleAddedMoney = (money) => {
    if (money.description.length > 18) {
      setErrorMsg("Description is too long!");
      setValidDesc(false);
    }
    if (money.amount > 999999999) {
      setErrorMsg("Max amount is 999999999€");
      setValidAmount(false);
    }  
    if (money.amount.length === 0) {
      setErrorMsg("Amount is empty");
      setValidAmount(false);
    } else if (!isNaN(money.amount)) {
      money.amount = money.amount * -1;
      saveItem(money, "expenditure");
      setExpenseList([...expenseList, money]);
      setValidDesc(true);
      setValidAmount(true);
    }
    setMoneyInput({description: "", amount: "", date: moment(new Date()).format()});
  }

  return (
    <Box style={styles.container}>
      <Stack space={5} alignItems="center" style={{ marginTop: 15}}>
        <Heading size="sm" color="second">Your total expenses in {chosenMonth}: {totalExpenses.toFixed(2).replace(".", ",")}€</Heading>
        <FormControl isInvalid={!validDesc}>
          <DescriptionInput 
            placeholderText="Add description"
            description={moneyInput.description}
            setMoneyInput={setMoneyInput}
            moneyInput={moneyInput}
          />
          <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!validAmount}>
          <AmountInput 
            placeholderText="Add new expense"
            amount={moneyInput.amount}
            setMoneyInput={setMoneyInput}
            moneyInput={moneyInput}
          />
          <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
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
        <MoneyFlatList moneyList={expenseList} chosenMonth={chosenMonth}/>
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
