import { Box, Stack, Text } from "native-base";
import { styles } from "../styles/stylesheet";


export default function HomePage() {
    
  return (
    <Box style={styles.container}>
      <Stack space={20} alignItems="center">
        <Text color="second">My Budget</Text>
        <Text color="second">HomePage</Text>
      </Stack>
    </Box>
  );
}
