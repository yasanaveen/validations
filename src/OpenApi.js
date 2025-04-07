import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

function FormikApiIntegration() {
  const initialValues = {
    title: '',
    body: '',
    userId: 1
  };

  const validate = (values) => {
    const errors = {};
    
    if (!values.title) {
      errors.title = 'Title is required';
    } else if (values.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    
    if (!values.body) {
      errors.body = 'Body content is required';
    } else if (values.body.length < 10) {
      errors.body = 'Body must be at least 10 characters';
    }
    
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      const data = await response.json();
      alert(`Post created successfully! ID: ${data.id}`);
      resetForm();
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title:</label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter post title"
              />
              <ErrorMessage name="title" component="div" 
              style={{ color: "red" }}
              />
            </div>
            
            <div>
              <label htmlFor="body">Content:</label>
              <Field
                as="textarea"
                id="body"
                name="body"
                placeholder="Enter post content"
                rows="5"
              />
              <ErrorMessage name="body" component="div" 
              style={{ color: "red" }}
              />
            </div>
            
            <div>
              <label htmlFor="userId">User ID:</label>
              <Field
                type="number"
                id="userId"
                name="userId"
                min="1"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Create Post'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikApiIntegration;