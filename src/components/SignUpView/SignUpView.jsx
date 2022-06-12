/* eslint-disable no-undef */
import React from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../../services/auth-service';
import FormContainer from '../FormContainer';
import styles from './SignUpView.module.css';
import useAuth from '../../hooks/useAuth';

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .lowercase()
    .email('Must be a valid email!'),
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastname: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  password: Yup.string()
    .matches(lowercaseRegex, 'One lowercase required!')
    .matches(uppercaseRegex, 'One uppercase required!')
    .matches(numericRegex, 'One number required!')
    .min(8, 'Minimum 8 characters required!')
    .required('Required'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required'),
});

function SignUpView() {
  const user = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        lastname: '',
        password: '',
        repassword: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={(values, formik) => {
        const email = values.email;
        const password = values.password;
        const name = values.name;
        const lastname = values.lastname;
        formik.setStatus(null);
        return signUp({ email, password, name, lastname })
          .then(() => {
            navigate('/');
          })
          .catch(() => {
            formik.setStatus('error');
          });
      }}
    >
      {({ errors, touched }) => {
        return (
          <FormContainer>
            <Form className={styles.form}>
              <h2 className={styles.headline}>Sign Up</h2>
              <p className={styles.paragraph}>
                Sign up to view <br /> photos and videos of your friends.
              </p>

              <div className={styles.flex}>
                <Field
                  className={styles.input}
                  type="email"
                  id="femail"
                  name="email"
                  placeholder="Your email.."
                />
                {errors.email && touched.email ? (
                  <div className={styles['notifications-valid']}>
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <div className={styles.flex}>
                <Field
                  className={styles.input}
                  type="text"
                  id="fname"
                  name="name"
                  placeholder="Your firstname.."
                />
                {errors.name && touched.name ? (
                  <div className={styles['notifications-valid']}>
                    {errors.name}
                  </div>
                ) : null}
              </div>

              <div className={styles.flex}>
                <Field
                  className={styles.input}
                  type="text"
                  id="surname"
                  name="lastname"
                  placeholder="Your lastname.."
                />
                {errors.lastname && touched.lastname ? (
                  <div className={styles.notificationsValid}>
                    {errors.lastname}
                  </div>
                ) : null}
              </div>

              <div className={styles.flex}>
                <Field
                  className={styles.input}
                  type="password"
                  id="fpassword"
                  name="password"
                  placeholder="Your password"
                />
                {errors.password && touched.password ? (
                  <div className={styles['notifications-valid']}>
                    {errors.password}
                  </div>
                ) : null}
              </div>

              <div className={styles.flex}>
                <Field
                  className={styles.input}
                  type="password"
                  id="reppassword"
                  name="repassword"
                  placeholder="Confirm password"
                />
                {errors.repassword && touched.repassword ? (
                  <div className={styles['notifications-valid']}>
                    {errors.repassword}
                  </div>
                ) : null}
              </div>
              <div className={styles.flex}>
                <button type="submit" className={styles.button}>
                  Next
                </button>
              </div>
              <div className={styles.flex}>
                <p className={styles.questionSign}>
                  Have an account
                  <Link className={styles.hyperlink} to="/signin">
                    Sign In
                  </Link>
                </p>
              </div>
            </Form>
          </FormContainer>
        );
      }}
    </Formik>
  );
}

export default SignUpView;
