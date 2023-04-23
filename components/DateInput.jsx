import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";

export default function DateInput({ moneyInput, setShowCalendar, setMoneyInput }) {

  const handleDate = (e, selectedDate) => {
    let currentDateString = moment(selectedDate).format();
    setShowCalendar(false);
    setMoneyInput(prev => ({...prev, date: currentDateString}));
  }

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={moment(moneyInput.date).toDate()}
      mode="date"
      display="default"
      is24Hour={true}
      onChange={handleDate}
    />
  );
}
