import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const userForm = ({ errors, touched }) => {
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
      .required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(userForm);

export default FormikUserForm;
