import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInput({ moneyInput, setShowCalendar, setMoneyInput }) {

  const handleDate = (e, selectedDate) => {
    let currentDate = selectedDate || new Date();
    setShowCalendar(false);
    setMoneyInput({...moneyInput, date: currentDate});
  }

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={moneyInput.date}
      mode="date"
      display="default"
      is24Hour={true}
      onChange={handleDate}
    />
  );
}
