import { NativeBaseProvider, extendTheme } from "native-base";
import { colorTheme } from "./styles/stylesheet";
import HomePage from "./views/HomePage";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack";
import RegisterPage from "./views/RegisterPage";
import IncomePage from "./views/IncomePage";
import ExpenditurePage from "./views/ExpenditurePage";
import moment from "moment";
import SettingsPage from "./views/SettingsPage";
import * as SQlite from "expo-sqlite";
import { Alert } from "react-native";
import LoginPage from "./views/LoginPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const database = SQlite.openDatabase("budgetdb.db");

const customTheme = extendTheme({ colors: colorTheme})

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
      tx.executeSql(
        'create table if not exists income (id integer primary key not null, description text, amount text, date text);'
        );
    });
    database.transaction(tx => {
      tx.executeSql(
        'create table if not exists expenditure (id integer primary key not null, description text, amount text, date text);'
      );
    });
    database.transaction(tx => {
      tx.executeSql(
        'create table if not exists user (id integer primary key not null, username text, password text);'
      );
    });
    updateIncome();
    updateExpenses();
    getStorageItem();
  }, []);

  const getStorageItem = async () => {
    try {
      const item = await AsyncStorage.getItem("loggedIn");
      setLoggedIn(item);
    } catch (e) {
      Alert.alert("Failed to get item");
    }
  }

  const updateIncome = () => {
    database.transaction(tx => {
      tx.executeSql('select * from income;', [], (_, { rows }) => {
        console.log(rows._array);
        setMoneyList(rows._array);
      }
      );
    });
  }

  const updateExpenses = () => {
    database.transaction(tx => {
      tx.executeSql('select * from expenditure;', [], (_, { rows }) => {
        setExpenseList(rows._array);
      }
      );
    });
  }

  const saveItem = (money, table) => {
    if (money) {
      if (table === "income") {
        database.transaction(tx => {
          tx.executeSql('insert into income (description, amount, date) values (?, ?, ?);', 
            [money.description, money.amount, money.date]);
        }, () => showError("Data not saved!"), updateIncome);
      } else if (table === "expenditure") {
        database.transaction(tx => {
          tx.executeSql('insert into expenditure (description, amount, date) values (?, ?, ?)',
            [money.description, money.amount, money.date]);
        }, () => showError("Data not saved!"), updateExpenses);
      }
    } else {
      Alert.alert("Error", "Invalid money");
    }
  }

  const showError = (message) => {
    Alert.alert("Error", message);
  }

  const deleteItem = (id, table) => {
    if (table === "income") {
      database.transaction(tx => {
        tx.executeSql('delete from income where id = ?;', [id]);
      }, (() => showError("Delete failed!")), updateIncome);
    } else if (table === "expenditure"){
      database.transaction(tx => {
        tx.executeSql('delete from expenditure where id = ?;', [id]);
      }, (() => showError("Delete failed!")), updateExpenses);
    }
  }

  const deleteAll = () => {
    database.transaction(tx => {
      tx.executeSql('delete from income;');
    }, null, updateIncome);
    database.transaction(tx => {
      tx.executeSql('delete from expenditure');
    }, null, updateExpenses);
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
              {props => <IncomePage {...props} moneyList={moneyList} setMoneyList={setMoneyList} saveItem={saveItem} deleteItem={deleteItem}/>}
            </Drawer.Screen>
            <Drawer.Screen
              name="Expenses"
            >
              {props => <ExpenditurePage {...props} expenseList={expenseList} setExpenseList={setExpenseList} saveItem={saveItem} deleteItem={deleteItem}/>}
            </Drawer.Screen>
            <Drawer.Screen 
              name="Settings"
            >
              {props => <SettingsPage {...props} setLoggedIn={setLoggedIn} deleteAll={deleteAll}/>}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
        :
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#1F2160",
                opacity: 0.9
              },
              headerTintColor: "#EAEBFA"
            }}
          >
            <Stack.Screen
              name="Register"
            >
              {props => <RegisterPage {...props} setLoggedIn={setLoggedIn} database={database} showError={showError}/>}
            </Stack.Screen>
            <Stack.Screen
              name="Login"
            >
              {props => <LoginPage {...props} setLoggedIn={setLoggedIn} database={database}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      }
    </NativeBaseProvider>
  );
}
