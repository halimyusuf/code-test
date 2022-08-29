import {
  Box,
  Pagination,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { headers } from "../../../data/contacts-table";

export default function ContactTableFooter({
  params,
  handleChangePage,
  handlePerPageChange,
}) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          colSpan={headers.length}
          count={params.count || 0}
          rowsPerPage={params.perPage || 5}
          page={params.page ? params.page - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handlePerPageChange}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
}

function TablePaginationActions(props) {
  const { count, page, onPageChange, rowsPerPage } = props;

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Pagination
        color="primary"
        count={Math.ceil(count / rowsPerPage)}
        page={page + 1}
        onChange={(event, value) => onPageChange(event, value)}
      />
    </Box>
  );
}
