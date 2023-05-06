import { Heading, VStack, Text, Button, Input, Center, Icon } from 'native-base';
import { useState, useEffect } from 'react';
import { styles } from '../styles/stylesheet';
import { MaterialIcons } from "@expo/vector-icons";
import { API_BASE, API_TOKEN } from "@env";

export default function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0");
  const [USDExhangeRate, setUSDExhangeRate] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}=${API_TOKEN}`)
    .then(res => res.json())
    .then(data => {
      setUSDExhangeRate(data.rates.USD);
      setLoading(false)
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    calculateRate(fromAmount);
  }, [fromCurrency])

  const calculateRate = (amount) => {
    setFromAmount(amount);
    if (isNaN(amount)) {
      setToAmount(0);
    } else if (fromCurrency === "EUR") {
        setToAmount(amount * USDExhangeRate);
    } else {
      setToAmount(amount / USDExhangeRate);
    }
  }

  const swapAmounts = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <Center>
      <VStack space={2} alignItems="center">
        <Heading size="sm">Euro USD exhange rate</Heading>
        {loading || 
          <Text style={styles.font1}>{fromAmount || 0} {fromCurrency} = {Number(toAmount).toFixed(5) || 0} {toCurrency}</Text>
        }
        <Input 
          w="60%"
          placeholder="Enter amount"
          variant="filled"
          borderColor="first"
          borderWidth="4"
          borderRadius="full"
          size="lg"
          keyboardType="numeric"
          value={fromAmount}
          InputRightElement={<Icon 
            as={<MaterialIcons name="euro" />}
            mr="2"
            size={5}
            color="first"
          />}
          onChangeText={newAmount => calculateRate(newAmount)}
        />
        <Button
          _pressed={{ opacity: 0.5 }} 
          backgroundColor="second"
          color="third"
          size="lg"
          width={140}
          borderRadius="full"
          onPress={swapAmounts}
        >
          Swap 
        </Button>
      </VStack>
    </Center>
  );
}
