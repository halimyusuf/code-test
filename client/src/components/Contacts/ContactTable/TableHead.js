import { TableCell, TableRow, TableHead } from "@mui/material";
import { headers } from "../../../data/contacts-table";

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header.label} {...header.extraProps}>
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
