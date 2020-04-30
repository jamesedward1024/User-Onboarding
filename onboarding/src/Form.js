import React, { useState, useEffect } from 'react';
import "./App.css";
import axios from 'axios';
import * as yup from 'yup';

export default function Form() {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        terms: ""
    })
    const formSubmit = e => { }
    const handleChange = e => { }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="firstName">
                First Name
                 <input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange} />
            </label>
            <label htmlFor="lastName">
                Last Name
                 <input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange} />
            </label>
            <label htmlFor="password">
                Password
                 <input
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange} />
            </label>
            <label htmlFor="terms">
                Terms and Conditions
                 <input
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>

        </form>
    )
}
