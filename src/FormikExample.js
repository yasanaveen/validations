import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
 
function FormikExample() {
  const initialValues = {
    name: '',
    email: '',
    age: '',
  };
 
  const validate = (values) => {
    const errors = {};
 
    if (!values.name) {
      errors.name = 'Name is required';
    }
 
    if (!values.email) {
      errors.email = 'Email is required';
    } 
    // else if (!/\S+@\S+\.\S+/.test(values.email)) {
    //   errors.email = 'Email address is invalid';
    // }
 
    if (!values.age) {
      errors.age = 'Age is required';
    } 
    // else if (!/^\d+$/.test(values.age)) {
    //   errors.age = 'Age must be a number';
    // } else if (Number(values.age) < 1 || Number(values.age) > 120) {
    //   errors.age = 'Age must be between 1 and 120';
    // }
 
    return errors;
  };
 
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);
      alert(`Submitted successfully! \nID: ${response.data.id}`);
      resetForm();
    } catch (error) {
      alert('Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div>
      <h2>Formik Controlled Form</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>
 
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
 
            <div>
              <label htmlFor="age">Age:</label>
              <Field
                type="text"
                id="age"
                name="age"
                placeholder="Enter your age"
              />
              <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
            </div>
 
            <button type="submit" disabled={!(isValid && dirty) || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
 
export default FormikExample;