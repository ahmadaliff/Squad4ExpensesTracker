import React, { useEffect, useState } from "react";
import { callAPI } from "../../domain/api";
import { Link, useParams } from "react-router-dom";
import {
  TextField,
  Alert,
  MenuItem,
  Button,
  Select,
  InputLabel,
} from "@mui/material";
import Styles from "./style.module.scss";
import DialogDelete from "../../components/DialogDelete";
import { Delete, Edit } from "@mui/icons-material";

const DetailPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataExpenses, setDataExpenses] = useState({
    id: id,
    price: "",
    comment: "",
    category: "",
  });
  useEffect(() => {
    getCategory();
    getExpensesById();
  }, []);
  useEffect(() => {
    (errorMsg.length > 0 || successMsg.length > 0) &&
      setTimeout(() => {
        setErrorMsg([]);
        setSuccessMsg([]);
      }, 2500);
  }, [errorMsg, successMsg]);
  const handleChange = (e) => {
    setDataExpenses({ ...dataExpenses, [e.target.name]: e.target.value });
  };
  const getCategory = async () => {
    try {
      const response = await callAPI(`category`);
      setCategory(response);
    } catch (error) {
      setErrorMsg((prev) => [...prev, "test"]);
    }
  };
  const getExpensesById = async () => {
    try {
      const response = await callAPI(`expenses/${id}`);
      setDataExpenses(response);
    } catch (error) {
      setErrorMsg((prev) => [...prev, error.message]);
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await callAPI(
        `expenses/${id}`,
        "PUT",
        null,
        null,
        dataExpenses
      );
      setSuccessMsg((prev) => [
        ...prev,
        `Expenses id: ${response.id}succesfull edited`,
      ]);
      setIsEdit(false);
      getExpensesById();
    } catch (error) {
      setErrorMsg((prev) => [...prev, error.message]);
    }
  };
  return (
    <div className={Styles.DetailPage}>
      <nav>
        <Link to={"/"}>
          <h1>Expenses Tracker</h1>
        </Link>
      </nav>
      <div className={Styles.alertWrap}>
        {successMsg?.map((msg, key) => (
          <Alert severity="success" key={key}>
            {msg}
          </Alert>
        ))}
        {errorMsg?.map((msg, key) => (
          <Alert severity="error" key={key}>
            {msg}
          </Alert>
        ))}
      </div>
      <div className={Styles.DetailWrap}>
        <div className={Styles.topWrap}>
          <h3>Detail Page</h3>
          <Edit
            className={Styles.editToggle}
            onClick={() => {
              setIsEdit(!isEdit);
              getExpensesById();
            }}
          />
        </div>
        <form onSubmit={handleSubmitEdit} className={Styles.form}>
          <TextField
            type="number"
            value={dataExpenses?.price}
            variant="standard"
            name="price"
            label="Price"
            onChange={(e) =>
              setDataExpenses({
                ...dataExpenses,
                price: parseInt(e.target.value),
              })
            }
            className={`${Styles.formInput} ${!isEdit && Styles.notEdit}`}
            disabled={!isEdit}
            required
          />
          <TextField
            type="text"
            value={dataExpenses?.comment}
            variant="standard"
            name="comment"
            label="Comment"
            multiline
            onChange={handleChange}
            className={`${Styles.formInput} ${!isEdit && Styles.notEdit}`}
            disabled={!isEdit}
            required
          />
          <div>
            <InputLabel id="test-select-label" className={Styles.label}>
              Category*
            </InputLabel>
            <Select
              id="category"
              value={dataExpenses?.category}
              name="category"
              label="Category"
              variant="standard"
              onChange={handleChange}
              className={`${Styles.formSelect} ${!isEdit && Styles.notEdit}`}
              disabled={!isEdit}
              select
              required
            >
              <MenuItem value="" disabled>
                Expenses Category
              </MenuItem>
              {category?.map((val, key) => (
                <MenuItem value={val?.category} key={key}>
                  {val?.category}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={Styles.buttonWrap}>
            {isEdit && (
              <Button type="submit" variant="contained" size="small">
                <p>Edit</p>
              </Button>
            )}
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => setIsOpen(true)}
              className={Styles.buttonDel}
            >
              <Delete />
            </Button>
          </div>
        </form>
        <DialogDelete
          handleClose={() => setIsOpen(false)}
          open={isOpen}
          data={dataExpenses}
          setErrMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
      </div>
    </div>
  );
};

export default DetailPage;
