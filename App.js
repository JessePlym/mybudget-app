import { NativeBaseProvider, Box, Text, extendTheme } from "native-base";
import { styles, colorTheme } from "./styles/stylesheet";
import RegisterPage from "./views/RegisterPage";

const customTheme = extendTheme({ colors: colorTheme})

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <RegisterPage />
    </NativeBaseProvider>
  );
}
