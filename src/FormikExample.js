import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function FormikExample() {

  const initialValues = {
    name: "Naveen",
    email: "naveen@gmail.com",
    age: 25,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if(!values.age){
        errors.age="Age is required";
    }

    return errors;
  };

  const handleSubmit = (values) => {
    alert(`Name: ${values.name}, Email: ${values.email}`);
  };

  return (
    <div>
      <h2>Formik Controlled Form</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                type="number"
                id="age"
                placeholder="Enter your age"
                />
                <ErrorMessage name="age" component="div" style={{ color: "red" }} />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default FormikExample;
