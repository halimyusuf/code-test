import { useState } from "react";
import { Box, Button } from "@mui/material";
import NewContactDialog from "./ContactFormDialog";
import ContactTable from "./ContactTable/index";

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({});

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setContact({});
  };

  return (
    <Box>
      <Box>
        <Button onClick={handleDialogOpen} variant="contained" disableElevation>
          New Contact
        </Button>
      </Box>

      <Box>
        <ContactTable {...{ setContact, handleDialogOpen }} />
      </Box>

      <NewContactDialog
        open={open}
        handleClose={handleDialogClose}
        state={contact}
        setState={setContact}
      />
    </Box>
  );
}
