import { Box, Button, VStack } from "native-base"
import { Alert } from "react-native"
import { styles } from "../styles/stylesheet";

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
  
  return (
    <Box style={styles.container}>
      <VStack space={10}>
        <Button
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
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={() => setLoggedIn(false)}
        >
          Log out
        </Button>
      </VStack>
    </Box>
  )
}
