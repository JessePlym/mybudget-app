import { Box, Text, Input, Icon, Stack, Button } from "native-base";
import { styles } from "../styles/stylesheet";
import { MaterialIcons } from "@expo/vector-icons";
import safeAreaProps from "../styles/safeAreaProps";

export default function RegisterPage() {

  return (
    <Box style={styles.container} {...safeAreaProps}>
      <Stack space={2} alignItems="center">
        <Text color="second" fontSize={28} >Register</Text>
        <Input 
          placeholder="Username"
          w="80%"
          size="lg"
          variant="filled"
          borderWidth="4"
          borderRadius="full"
          borderColor="first"
          InputLeftElement={<Icon 
            as={<MaterialIcons name="person" />}
            ml="2"
            size={5}
            color="first"
          />}
        />
        <Input
          type="password"
          placeholder="Password"
          w="80%"
          size="lg"
          variant="filled"
          borderWidth="4"
          borderRadius="full"
          borderColor="first"
          InputLeftElement={<Icon 
            as={<MaterialIcons name="visibility" />}
            ml="2"
            size={5}
            color="first"
          />}
        />
        <Button 
          size="lg"
          borderRadius="lg"
          colorScheme="darkBlue"
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}