import { Button } from "native-base"

export default function SettingsPage({ setLoggedIn }) {
  
  return (
    <Button onPress={() => setLoggedIn(false)}>Log out</Button>
  )
}
