import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompaniesState } from "../../../store/company/reducers";
import { fetchContacts } from "../../../store/contact/actions";
import { getContactParams } from "../../../store/contact/reducers";

export default function ContactTableFilter() {
  const params = useSelector(getContactParams);
  const companies = useSelector(getCompaniesState);
  const [state, setState] = useState(params.company);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchContacts({ ...params, page: 1, company: state || "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, dispatch]);

  return (
    <Box mt={1} mb={2} className="company-filter">
      <FormControl fullWidth>
        <InputLabel id="contact-company-filter-id">Filter by</InputLabel>
        <Select
          labelId="contact-company-filter-id"
          value={state || ""}
          label="Company"
          onChange={handleChange}
          fullWidth
        >
          {companies?.map((company) => (
            <MenuItem key={company._id} value={company._id}>
              {company.LegalName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
