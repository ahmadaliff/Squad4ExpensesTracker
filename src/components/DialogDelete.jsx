import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { callAPI } from "../domain/api";
import { useNavigate } from "react-router-dom";

const DialogDelete = ({
  open,
  handleClose,
  data,
  setErrMsg,
  setSuccessMsg,
}) => {
  const navigate = useNavigate();
  const handleDelExpenses = async () => {
    try {
      await callAPI(`expenses/${data.id}`, "DELETE");
      handleClose();
      setSuccessMsg((prev) => [
        ...prev,
        `Expenses id: ${data.id}succesfull deleted`,
      ]);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrMsg((prev) => [...prev, error.message]);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Are you sure to delete this expenses?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Price : {data.price}
          <br />
          comment : {data.comment}
          <br />
          Cateory : {data.category}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={() => handleDelExpenses()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDelete;
