/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { callAPI } from '../../domain/api'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import styles from './category.module.scss'

const AddCategory = () => {
    const [dataCategory, setDataCategory] = useState()
    const [error, setError] = useState({})

    // Fetch Data API
    const fetchData = async () => {
        try {
            const response = await callAPI('/expenses')
            setDataCategory(response)
        } catch (err) {
            console.error('Error Fetching Data: ', err)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // State Form Data
    const [formData, setFormData] = useState({
        category: '',
    })

    // Handle Change Form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    // Handle Submit Button
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!validateForm()) {
            return
        }

        try {
            const response = await axios.post('http://localhost:3000/category', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 201) {
                console.log('Form Data Submitted Successfully');
                window.alert('Data has been successfully added!');
            } else {
                console.error('Form Data Submission Failed')
            }
        } catch (err) {
            console.error('Error for Submitting Data: ', err)
        }
    }

    // Validation Function
    const validateForm = () => {
        let valid = true
        const newError = {}

        if (formData.category === '') {
            newError.category = '*Category is Required'
            valid = false
        }

        setError(newError)
        return valid
    }

    return (
        <div className={styles.form}>
            <h1> Add Category Data </h1>
            <form className={styles.form__validate} onSubmit={handleSubmit}>
            <div className={styles.form__validate__error}> {error.category} </div>
                <TextField className={styles.form__validate__input}
                    // required
                    id="outlined-required"
                    label="Category"
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                />
                <Button className={styles.form__validate__button} variant="contained" type='submit'> Create </Button>
            </form>
        </div>
    )
}

export default AddCategory
