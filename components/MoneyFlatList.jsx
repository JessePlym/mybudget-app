import { FlatList } from "react-native";
import { Text, HStack } from "native-base";
import { styles } from "../styles/stylesheet";
import moment from "moment/moment";

export default function MoneyFlatList({ moneyList, chosenMonth}) {
  return (
    <FlatList 
          data={moneyList}
          renderItem={({ item }) => {
            if (moment(item.date).format("MMMM") === chosenMonth) {
              return <HStack space={8} justifyContent="space-between" marginRight={2}>
                <Text style={styles.font1}>{item.description || "No description"}</Text>
                <Text style={styles.font2}>{Number(item.amount).toFixed(2).replace(".", ",")}€</Text>
              </HStack>
            } 
          }}
          keyExtractor={(item, index) => index.toString()}
        />
  )
}
