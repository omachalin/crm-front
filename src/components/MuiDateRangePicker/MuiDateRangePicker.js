import React from "react";
import { DateRangePicker } from "materialui-daterange-picker";
import * as fns from "date-fns";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { useState } from "react";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  block: {
    marginTop: 16
  },
  textField: {
    width: "100%",
  }
}));

export const MuiDateRangePicker = (props) => {
  const classes = useStyles();
  const [dateRange, setDateRange] = useState()
  const [open, setOpen] = React.useState(false);

  const format = props.fomat ?? "yyyy-MM-dd";

  const toggle = () => setOpen(!open);

  const getDisplayDateRange = (dateRange) => {
    const startDate = dateRange?.startDate
      ? fns.format(dateRange.startDate, format)
      : undefined;

    const endDate = dateRange?.endDate
      ? fns.format(dateRange.endDate, format)
      : undefined;

    return startDate || endDate ? `${startDate} - ${endDate}` : "";
  };

  return (
    <div className={classes.block}>
      <TextField
        className={classes.textField}
        variant="standard"
        value={getDisplayDateRange(dateRange) || 'Дата'}
        onClick={toggle}
      />
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div>
            <DateRangePicker
              open={true}
              toggle={toggle}
              onChange={(range) => {
                if(props.onDateRangeChange) {
                  props?.onDateRangeChange(range);
                }
                setDateRange(range)
                toggle();
              }}
              initialDateRange={props.dateRange}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
