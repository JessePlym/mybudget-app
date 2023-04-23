import { useState, useRef } from "react";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
import moment from "moment/moment";

export default function MoneyDetails({ open, setOpen, money, table }) {
  //const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setOpen(false);

  const cancelRef = useRef(null);

  const handleDelete = (id, table) => {
    setOpen(false);
  }

  return <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={open} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{money.description}</AlertDialog.Header>
          <AlertDialog.Body>
            {`${money.amount} €`}{moment(money.date).format("DD.MM.YYYY")}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={() =>handleDelete(money.id, table)}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>;
}
