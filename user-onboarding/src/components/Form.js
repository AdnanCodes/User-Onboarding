import React from "react";
import { Form, Field, withFormik } from "formik";

const userForm = props => {
  return (
    <div className="">
      <h1>Welcome User, Let's get you checked-in!</h1>
      <Form>
        <Field type="text" name="username" placeholder="Username" />
        <Field type="email" name="email" placeholder="Email Address" />
        <Field type="password" name="password" placeholder="Password" />
        <Field type="checkbox" name="terms" />
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
  handleSubmit(values) {
    console.log(values);
  }
})(userForm);

export default FormikUserForm;
