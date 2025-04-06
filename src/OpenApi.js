import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function FormikApiForm() {
  const initialValues = {
    name: "",
    job: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.job) {
      errors.job = "Job is required";
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("https://reqres.in/api/users", values);
      alert(`User Created:\nName: ${response.data.name}\nJob: ${response.data.job}\nID: ${response.data.id}`);
      resetForm(); // clear the form after submission
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Submit Form to Open API (ReqRes)</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" placeholder="Enter name" />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="job">Job:</label>
              <Field type="text" name="job" placeholder="Enter job title" />
              <ErrorMessage name="job" component="div" style={{ color: "red" }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikApiForm;
