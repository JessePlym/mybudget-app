import { Box, Text, Input, Icon, Stack, Button } from "native-base";
import { styles } from "../styles/stylesheet";
import { MaterialIcons } from "@expo/vector-icons";

export default function RegisterPage() {

  return (
    <Box style={styles.container}>
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
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}