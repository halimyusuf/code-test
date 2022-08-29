import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactParams,
  getContactState,
} from "../../../store/contact/reducers";
import { fetchContacts } from "../../../store/contact/actions";
import { useAsync } from "../../../api/use-async";
import TableHeader from "./TableHead";
import ContactTableBody from "./TableBody";
import ContactTableFooter from "./TableFooter";
import ContactTableFilter from "./TableFilter";
import "../../../styles/contacts-table.css";

export default function ContactTable({ setContact, handleDialogOpen }) {
  const params = useSelector(getContactParams);
  const contacts = useSelector(getContactState);
  const dispatch = useDispatch();
  const { status, run } = useAsync();
  const isPending = status === "pending";

  function onRetry() {
    if (isPending) return;
    run(dispatch(fetchContacts()));
  }

  useEffect(() => {
    run(dispatch(fetchContacts()));
  }, [dispatch, run]);

  const handleChangePage = (event, newPage) => {
    if (isPending) return;
    run(dispatch(fetchContacts({ ...params, page: newPage })));
  };

  const handlePerPageChange = (event) => {
    if (isPending) return;
    const value = parseInt(event.target.value, 10);
    run(dispatch(fetchContacts({ ...params, page: 1, perPage: value })));
  };

  const onEditClick = (row) => {
    setContact({
      ...row,
      CompanyID: row.CompanyID?._id,
    });
    handleDialogOpen();
  };

  return (
    <TableContainer component={Paper}>
      <Box>
        <ContactTableFilter />
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader />

        {status === "resolved" && contacts !== null && (
          <ContactTableBody {...{ onEditClick, contacts }} />
        )}

        {isPending && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        )}

        {status === "error" && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography textAlign={"center"}>
                  Error Occured,{" "}
                  <Button variant="text" onClick={onRetry}>
                    Retry
                  </Button>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}

        <ContactTableFooter
          {...{ handleChangePage, handlePerPageChange, params }}
        />
      </Table>
    </TableContainer>
  );
}
