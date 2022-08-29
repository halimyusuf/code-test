import { Box, Button, TableBody, TableCell, TableRow } from "@mui/material";

export default function ContactTableBody({ contacts, onEditClick }) {
  return (
    <TableBody>
      {contacts?.map((row) => (
        <TableRow
          key={row._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.FirstName}
          </TableCell>
          <TableCell>{row.LastName}</TableCell>
          <TableCell>{row.PhoneNumber}</TableCell>
          <TableCell>{row.Email}</TableCell>
          <TableCell>{row.CompanyID?.LegalName}</TableCell>
          <TableCell>
            <Box display={"flex"}>
              <Button onClick={() => onEditClick(row)}>Edit</Button>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
