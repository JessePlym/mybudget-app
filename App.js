import { NativeBaseProvider, extendTheme } from "native-base";
import { styles, colorTheme } from "./styles/stylesheet";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";

const customTheme = extendTheme({ colors: colorTheme})

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <HomePage />
    </NativeBaseProvider>
  );
}
