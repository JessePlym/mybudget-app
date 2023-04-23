import { Alert, FlatList } from "react-native";
import { Text, HStack, Button } from "native-base";
import { styles } from "../styles/stylesheet";
import moment from "moment/moment";
import MoneyDetails from "./MoneyDetails";
import { useState } from "react";

export default function MoneyFlatList({ moneyList, chosenMonth, deleteItem}) {

  const [open, setOpen] = useState(true);

  const openDetails = (money, table) => {
    return <MoneyDetails money={money}/>
  }

  return (
    <FlatList 
          data={moneyList}
          renderItem={({ item }) => {
            if (moment(item.date).format("MMMM") === chosenMonth) {
              return <> 
                <HStack space={8} justifyContent="space-between" marginRight={2}>
                  <Text style={styles.font1}>{item.description || "No description"}</Text>
                  <Text style={styles.font2}>{Number(item.amount).toFixed(2).replace(".", ",")}€</Text>
                </HStack>
                <MoneyDetails open={open} setOpen={setOpen} money={item} table="income"/>
              </>
            } 
          }}
          keyExtractor={(item, index) => index.toString()}
        />
  )
}
