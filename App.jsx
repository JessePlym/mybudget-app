import { NativeBaseProvider, extendTheme } from "native-base";
import { styles, colorTheme } from "./styles/stylesheet";
import HomePage from "./views/HomePage";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import RegisterPage from "./views/RegisterPage";
import IncomePage from "./views/IncomePage";
import ExpenditurePage from "./views/ExpenditurePage";
import moment from "moment";
import SettingsPage from "./views/SettingsPage";
import * as SQlite from "expo-sqlite";
import { Alert } from "react-native";

const database = SQlite.openDatabase("budgetdb.db");

const customTheme = extendTheme({ colors: colorTheme})

const Drawer = createDrawerNavigator();

export const CURRENT_MONTH = moment().format("MMMM");

export default function App() {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [moneyList, setMoneyList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    calculateMonthlyBudget();
  }, [moneyList, expenseList])

  useEffect(() => {
    database.transaction(tx => {
      tx.executeSql('create table if not exists income (id integer primary key not null, description text, amount text, date text);');
    });
    updateList(); 
  }, []);

  const updateList = () => {
    database.transaction(tx => {
      tx.executeSql('select * from income;', [], (_, { rows }) => {
        console.log(rows._array);
        setMoneyList(rows._array)
      }
      );
    });
  }

  const saveIncome = (money) => {
    if (money) {
      database.transaction(tx => {
        tx.executeSql('insert into income (description, amount, date) values (?, ?, ?);', 
          [money.description, money.amount, money.date]);
      }, null, updateList)
    } else {
      Alert.alert("Error", "Invalid income");
    }
  }

  const deleteItem = (id, table) => {
    if (table === "income") {
      database.transaction(tx => {
        tx.executeSql('delete from income where id = ?;', [id]);
      }, null, updateList)
    } else {
      // same for expenses
    }
  }

  const calculateMonthlyBudget = () => {
    let incomeListOfCurrentMonth = moneyList.filter(money => moment(money.date).format("MMMM") === CURRENT_MONTH);
    let expenseListOfCurrentMonth = expenseList.filter(expense => moment(expense.date).format("MMMM") === CURRENT_MONTH);
    let income = incomeListOfCurrentMonth.reduce((total, money) => total + Number(money.amount), 0);
    let expenses = expenseListOfCurrentMonth.reduce((total, expense) => total + Number(expense.amount), 0);
    setMonthlyBudget(expenses + income);
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      { loggedIn ? 
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#1F2160",
                opacity: 0.9
              },
              headerTintColor: "#EAEBFA",
              drawerStyle: {
                backgroundColor: "#EAEBFA"
              }
            }}
          >
            <Drawer.Screen
              name="Home"
            >
              {props => <HomePage {...props} monthlyBudget={monthlyBudget} />}
            </Drawer.Screen>
            <Drawer.Screen
              name="Income"
            >
              {props => <IncomePage {...props} moneyList={moneyList} setMoneyList={setMoneyList} saveIncome={saveIncome}/>}
            </Drawer.Screen>
            <Drawer.Screen
              name="Expenses"
            >
              {props => <ExpenditurePage {...props} expenseList={expenseList} setExpenseList={setExpenseList}/>}
            </Drawer.Screen>
            <Drawer.Screen 
              name="Settings"
            >
              {props => <SettingsPage {...props} setLoggedIn={setLoggedIn} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
        :
        <RegisterPage setLoggedIn={setLoggedIn}/>
      }
    </NativeBaseProvider>
  );
}
