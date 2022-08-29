import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../store/company/actions";
import { getCompaniesState } from "../../store/company/reducers";
import { formObj, validationSchema } from "../../data/contact-form";
import { useFormik } from "formik";
import { editContactDetail, addNewContact } from "../../store/contact/actions";
import { useAsync } from "../../api/use-async";

export default function NewContactDialog({
  open,
  handleClose,
  state,
  setState,
}) {
  const companies = useSelector(getCompaniesState);
  const dispatch = useDispatch();
  const { run, status } = useAsync();

  const formik = useFormik({
    initialValues: state,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // api call
      const func = state._id ? editContactDetail : addNewContact;
      run(
        dispatch(func(values, state._id)).then(() => {
          handleClose();
        })
      );
    },
  });

  React.useEffect(() => {
    formik.setValues(state);
    formik.setTouched({}, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  React.useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    setState({ ...formik.values, CompanyID: event.target.value });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{state._id ? "Edit Contact" : "New Contact"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            {formObj.map((obj) => (
              <Box
                key={obj.field}
                sx={{
                  "& .MuiTextField-root": {
                    my: 1,
                    width: "400px",
                    maxWidth: "100%",
                  },
                  "& fieldset": {
                    borderRadius: "64px",
                  },
                }}
              >
                <TextField
                  disabled={obj.disabled}
                  id={obj.field}
                  name={obj.field}
                  variant="standard"
                  placeholder={obj.label}
                  label={obj.label}
                  type={obj.field}
                  onChange={formik.handleChange}
                  value={formik.values[obj.field] || ""}
                  error={
                    formik.touched[obj.field] &&
                    Boolean(formik.errors[obj.field])
                  }
                  helperText={
                    formik.touched[obj.field] && formik.errors[obj.field]
                  }
                />
              </Box>
            ))}

            <Box mt={1} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="contact-company-id">Company</InputLabel>
                <Select
                  labelId="contact-company-id"
                  value={state.CompanyID || ""}
                  label="Company"
                  onChange={handleSelectChange}
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

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              className="form-submit-btn"
              size="large"
            >
              {status === "pending" ? (
                <CircularProgress size={15} sx={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
