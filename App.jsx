import { NativeBaseProvider, extendTheme } from "native-base";
import { styles, colorTheme } from "./styles/stylesheet";
import HomePage from "./views/HomePage";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import RegisterPage from "./views/RegisterPage";
import IncomePage from "./views/IncomePage";

const customTheme = extendTheme({ colors: colorTheme})

const Drawer = createDrawerNavigator();

export default function App() {

  const [monthlyBudget, setMonthlyBudget] = useState(1235);

  return (
    <NativeBaseProvider theme={customTheme}>
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
            component={IncomePage}
          /> 
          <Drawer.Screen 
            name="Register"
            component={RegisterPage}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
