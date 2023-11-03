/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { callAPI } from "../../domain/api";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import styles from "./transaction.module.scss";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [dataExpenses, setDataExpenses] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // Fetch Data API
  const fetchData = async () => {
    try {
      const response = await callAPI("/expenses");
      setDataExpenses(response);
    } catch (err) {
      console.error("Error Fetching Data:", err);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await callAPI("/category");
      setDataCategory(response);
    } catch (err) {
      console.error("Error Fetching Data: ", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  console.log(dataExpenses);
  console.log(dataCategory);

  // State Form Data
  const [formData, setFormData] = useState({
    price: "",
    comment: "",
    category: "",
  });

  // Handle Change Form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name == "price" ? parseInt(e.target.value) : e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  // Handle Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/expenses",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Form Data Submitted Successfully");
        window.alert("Data has been successfully added!");
        navigate("/");
      } else {
        console.error("Form Data Submission Failed");
      }
    } catch (err) {
      console.error("Error for Submitting Data: ", err);
    }
  };

  // Validation Function
  const validateForm = () => {
    let valid = true;
    const newError = {};

    if (formData.price === "") {
      newError.price = "*Price is Required";
      valid = false;
    }

    if (formData.comment === "") {
      newError.comment = "*Comment is Required";
      valid = false;
    }

    if (formData.category === "") {
      newError.category = "*Category is Required";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  // MenuPropsSelect
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <div className={styles.form}>
      <h1> Add Form Expenses Data </h1>
      <form className={styles.form__validate} onSubmit={handleSubmit}>
        <div className={styles.form__validate__error}> {error.price} </div>
        <FormControl className={styles.form__validate__input}>
          <InputLabel htmlFor="price-form"> Price </InputLabel>
          <OutlinedInput
            id="price-form"
            startAdornment={
              <InputAdornment position="start">IDR</InputAdornment>
            }
            label="price"
            name="price"
            inputProps={{
              type: "number",
            }}
            value={formData.price}
            onChange={handleChange}
          />
        </FormControl>

        <div className={styles.form__validate__error}> {error.comment} </div>
        <TextField
          className={styles.form__validate__input}
          id="comment-form"
          label="Comment"
          name="comment"
          multiline
          maxRows={6}
          value={formData.comment}
          onChange={handleChange}
        />

        <div className={styles.form__validate__error}> {error.category} </div>
        <FormControl className={styles.form__validate__input}>
          <InputLabel id="category-select-label"> Category </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {dataCategory?.map((category) => (
              <MenuItem
                className={styles.item}
                key={category?.id}
                value={category?.category}
              >
                {" "}
                {category?.category}{" "}
              </MenuItem>
            ))}
            <MenuItem
              className={styles.item__add}
              value=""
              onClick={() => {
                navigate("/add/category");
              }}
            >
              {" "}
              Add More Category{" "}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          className={styles.form__validate__button}
          variant="contained"
          type="submit"
        >
          {" "}
          Create{" "}
        </Button>
      </form>
    </div>
  );
};

export default AddTransaction;
