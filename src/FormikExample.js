import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

function FormikExample() {
  const [users, setUsers] = useState([]);

  const initialValues = {
    name: 'Naveen Yasa',
    email: 'naveen@gmail.com',
    age: '27 ',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    }

    if (!values.age) {
      errors.age = 'Age is required';
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form submitted with values:", values);

    try {
      const response = await axios.post('http://localhost:8080/api/login', values);
      alert(`Submitted successfully! \nID: ${response.data.id}`);
      resetForm();
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/fetchAll');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('Failed to fetch users.');
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
                type="number"
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

      <hr />

      <button onClick={fetchUsers} style={{ marginTop: '1rem' }}>
         All Users
      </button>

      {users.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>User List:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} | {user.email} | Age: {user.age}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FormikExample;
