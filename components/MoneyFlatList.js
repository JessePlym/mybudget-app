import { FlatList } from "react-native";
import { Text, HStack } from "native-base";
import { styles } from "../styles/stylesheet";
import ListSeparator from "./ListSeparator";

export default function MoneyFlatList({ moneyList}) {
  return (
    <FlatList 
          data={moneyList}
          renderItem={({ item }) => (
            <HStack space={5} justifyContent="space-between" marginRight={2}>
              <Text style={styles.font1}>{item.description}</Text>
              <Text style={styles.font2}>{Number(item.amount).toFixed(2).replace(".", ",")}€</Text>
            </HStack>
          )}
          ItemSeparatorComponent={ListSeparator}
        />
  )
}
