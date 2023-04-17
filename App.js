import { NativeBaseProvider, extendTheme } from "native-base";
import { styles, colorTheme } from "./styles/stylesheet";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import { useState } from "react";

const customTheme = extendTheme({ colors: colorTheme})

export default function App() {

  const [monthlyBudget, setMonthlyBudget] = useState(1235);

  return (
    <NativeBaseProvider theme={customTheme}>
      <HomePage monthlyBudget={monthlyBudget} />
    </NativeBaseProvider>
  );
}
