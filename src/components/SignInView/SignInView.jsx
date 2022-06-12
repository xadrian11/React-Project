import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signIn } from '../../services/auth-service';
import styles from './SignInView.module.css';
import inputStyle from '../Input/Input.module.css';
import Form from '../Form';
import SubmitButton from '../SubmitButton';
import Input from '../Input';
import Label from '../Label';
import FormControl from '../FormControl';
import FormContainer from '../FormContainer';
import useAuth from '../../hooks/useAuth';

const signInSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

function SignInView() {
  const user = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      const email = values.email;
      const password = values.password;
      formik.setStatus(null);
      return signIn({ email, password })
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          formik.setStatus('error');
        });
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer>
      <Form onSubmit={formik.handleSubmit}>
        <h1 className={styles.formHeader}> Sign In</h1>
        {formik.status === 'error' && (
          <div className={styles.error}>
            There was an error while submitting
          </div>
        )}
        <div className={styles.inputContainer}>
          <FormControl>
            <Label htmlFor="email" labelContent="Email"></Label>
            <Input
              id="email"
              type="email"
              name="email"
              className={
                formik.touched.email && formik.errors.email
                  ? `${styles.errorBorder}`
                  : `${inputStyle.input}`
              }
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className={styles.error}>{formik.errors.email}</p>
            ) : null}
          </FormControl>

          <FormControl>
            <Label htmlFor="password" labelContent="Password"></Label>
            <Input
              id="password"
              type="password"
              name="password"
              className={
                formik.touched.password && formik.errors.password
                  ? `${styles.errorBorder}`
                  : `${inputStyle.input}`
              }
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className={styles.error}>{formik.errors.password}</p>
            ) : null}
          </FormControl>
        </div>
        <SubmitButton
          disabled={formik.isSubmitting}
          buttonContent={formik.isSubmitting ? 'Submitting' : 'Sign In!'}
        />
        <h3 className={styles.linkHeader}>
          Don&apos;t have an account?{' '}
          <Link className={styles.signUpLink} to="/signup">
            Sign up!
          </Link>
        </h3>
      </Form>
    </FormContainer>
  );
}

export default SignInView;
