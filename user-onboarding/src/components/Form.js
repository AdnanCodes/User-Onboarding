import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, status }) => {
  const [user, setUser] = useState([]);
  console.log(user);
  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);
  return (
    <div className="">
      <h1>Welcome User, Let's get you checked-in!</h1>
      <Form className="user-form">
        <Field
          type="text"
          name="username"
          placeholder="Username"
          className="user"
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field
          type="email"
          name="email"
          placeholder="Email Address"
          className="user email"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field
          type="password"
          name="password"
          placeholder="Password"
          className=" user pass"
        />
        Accept the Terms of Service
        <Field type="checkbox" name="terms" className="user check" />
        <button type="submit">Submit!</button>
      </Form>
      {user.map(eachUser => (
        <p key={eachUser.id}>
          Username: {eachUser.username} <br />
          Email: {eachUser.email}
        </p>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ username, password, email, terms }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email is required to sign up"),
    password: Yup.string()
      .min(6, "Password needs to be at least 6 characters")
      .required("Password is required")
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post(`https://reqres.in/api/users/`, values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
