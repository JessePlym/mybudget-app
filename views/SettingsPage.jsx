import { Box, Button, VStack } from "native-base"
import { Alert } from "react-native"
import { styles } from "../styles/stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsPage({ setLoggedIn, deleteAll }) {

  const handleReset = () => {
    Alert.alert(
      "Reset data",
      "This will delete all data",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deleteAll(),
          style: "default"
        }
      ],
      {
        cancelable: true,
      },
    );
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("loggedIn");
      setLoggedIn(false);
    } catch (e) {
      Alert.alert("failed to remove item");
    }
  }
  
  return (
    <Box style={styles.container}>
      <VStack space={10}>
        <Button
          _pressed={{ opacity: 0.5 }}
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={handleReset}
        >
          Reset all data
        </Button>
        <Button
          _pressed={{ opacity: 0.5 }}
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={() => logOut()}
        >
          Log out
        </Button>
      </VStack>
    </Box>
  )
}
