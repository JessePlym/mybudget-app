import { Box, VStack, Heading, Select, Stack } from "native-base";
import { styles } from "../styles/stylesheet";
import { useMemo, useState } from "react";
import moment from "moment/moment";

const BUDGET_TYPES = ["Monthly", "Weekly", "Daily"];

export default function HomePage({ monthlyBudget }) {
  const [budgetType, setBudgetType] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(monthlyBudget);

  const currentDate = useMemo(() => new Date().toLocaleDateString("fi-Fi"), []);
  const currentWeekday = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(new Date());
  }, []);

  const calculateDailyBudget = (budget) => {
    let daysOfMonth = moment().daysInMonth();
    let daysLeft = daysOfMonth - new Date().getDate() + 1; // plus one to count current day as well
    setBudgetAmount(budget / daysLeft);
  }

  const calculateWeeklyBudget = (budget) => {
    let daysInMonth = moment().daysInMonth();
    setBudgetAmount(budget / (daysInMonth / 7));
  }

  const handleBudgetChange = (itemValue) => {
    setBudgetType(itemValue);
    switch (itemValue) {
      case "Daily Budget":
        calculateDailyBudget(monthlyBudget);
        break;
      case "Weekly Budget":
        calculateWeeklyBudget(monthlyBudget);
        break;
      default:
        setBudgetAmount(monthlyBudget);
    }
  };
    
  return (
    <Box style={styles.container}>
      <Stack space={20} alignItems="center">
        <VStack space={5} alignItems="center">
          <Heading color="second">My Budget</Heading>
          <Heading size="sm" color="second">{currentWeekday} {currentDate || "Date"}</Heading>
        </VStack>
        <VStack space={4} alignItems="center">
          <Heading size="sm" color="second">Your {budgetType || "Monthly Budget"}: {budgetAmount.toFixed(2).replace(".", ",")}€</Heading>
          <Select
            placeholder="Change budget view"
            minWidth="200"
            color="second"
            borderRadius="full"
            borderColor="first"
            borderWidth="4"
            selectedValue={budgetType}
            onValueChange={itemValue => handleBudgetChange(itemValue)}
          >
            {
              BUDGET_TYPES.map((type, index) => (
                <Select.Item key={index} label={`${type} Budget`} value={`${type} Budget`}/>
              ))
            }
          </Select>
        </VStack>
      </Stack>
    </Box>
  );
}