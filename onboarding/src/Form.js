import React, { useState, useEffect } from 'react';
import "./App.css";
import axios from 'axios';
import * as yup from 'yup';



let schema = yup.object().shape({
    name: yup.string().min(2).required("You must enter your name to create an account"),
    emailAddress: yup.string().email("You must enter a valid email address."),
    password: yup.string().required(),
    terms: yup.boolean().oneOf([true], "You must agree to the Terms and Conditions to make an account."),
});

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        emailAddress: "",
        password: "",
        terms: ""
    })

    const [error, setError] = useState({
        name: "",
        emailAddress: "",
        password: "",
        terms: ""

    })

    const [user, setUser] = useState([])


    const validator= e => {
        yup
          .reach(schema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setError({
              ...error,
              [e.target.name]: ""
            })
          })
          .catch(err => {
            setError({
              ...error,
              [e.target.name]: err.errors[0]
            });
          });
      }

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post('https://reqres.in/api/users', formState)
            .then(response => {
                setUser(response.data);

                setFormState({
                    name: "",
                    emailAddress: "",
                    password: "",
                    terms: ""
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleChange = e => {
        e.persist();
        const newValues = {
            ...formState,
            [e.target.name]:
                e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };
        validator(e);
        setFormState(newValues);
    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name" className="form-field name">
                <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                />
                {error.name.length > 0 ? <p className="error">{error.name}</p> : null }
            </label>
            <label htmlFor="emailAddress" className="form-field email">
                <input
                        type="text"
                        name="emailAddress"
                        value={formState.emailAddress}
                        onChange={handleChange}
                        placeholder="Email Address"
                />
                {error.emailAddress.length > 0 ? <p className="error">{error.emailAddress}</p> : null }
            </label>
            <label htmlFor="password" className="form-field password">
                <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder="New Password"
                />
            </label>
            <label className="form-field terms">
                <label htmlFor="terms">
                        Terms and Conditions
                </label>
                <input
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={handleChange}
                />

            </label>
            <button>Submit</button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </form>
    )
}
