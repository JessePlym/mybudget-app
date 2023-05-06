import { FlatList } from "react-native";
import { Text, HStack } from "native-base";
import { styles } from "../styles/stylesheet";
import moment from "moment/moment";
import MoneyDetails from "./MoneyDetails";
import { useState } from "react";

export default function MoneyFlatList({ moneyList, chosenMonth, table, deleteItem}) {

  const [open, setOpen] = useState(false);

  return (
    <FlatList 
          data={moneyList}
          renderItem={({ item }) => {
            if (moment(item.date).format("MMMM") === chosenMonth) {
              return <> 
                <HStack space={8} justifyContent="space-between" marginRight={2}>
                  <Text onPress={() => setOpen(true)} style={styles.font1}>{item.description || "No description"}</Text>
                  <Text onPress={() => setOpen(true)} style={styles.font2}>{Number(item.amount).toFixed(2).replace(".", ",")}€</Text>
                </HStack>
                <MoneyDetails open={open} setOpen={setOpen} money={item} table={table} deleteItem={deleteItem}/>
              </>
            } 
          }}
          keyExtractor={(item, index) => index.toString()}
        />
  )
}
