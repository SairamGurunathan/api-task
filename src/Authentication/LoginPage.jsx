import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import * as yup from "yup";
import { useFormik } from 'formik';
import api from "../Global/Interceptors";
import { Image } from '../Assects/Img/Img';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Email is Required").email("Enter Valid Email"),
  password: yup.string().required("Password is Required")
});

const LoginPage = ({ setIsAuthenticated }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await api.post("/admin/login", {
          email: values.email,
          password: values.password,
        });

        if (res.status === 200) {
          localStorage.setItem("accesstoken", res.data.accesstoken);
          localStorage.setItem("refreshtoken", res.data.refreshtoken);

          setIsAuthenticated(true);
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
          setIsAuthenticated(false);
        }
      }
      setSubmitting(false);
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    setIsAuthenticated(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <img src={Image.logo} alt="logo" className='img img-size' />

        <form className='form' onSubmit={formik.handleSubmit}>
          <h4>Login</h4>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className='rounded-1'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className='error'>{formik.errors.email}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className='rounded-1'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className='error'>{formik.errors.password}</p>
            )}
          </Form.Group>
          <Link to='#' className='text-decoration-none'><small>Forgot Password?</small></Link>
          <Button
            variant='primary'
            type='submit'
            className='mt-3 rounded-1 w-100 border-0 py-2'
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <div className="d-flex align-items-center justify-content-center">
                <ThreeDots height='24' width='40' radius='4' color='#fff' ariaLabel='three-dots-loading' />
              </div>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}

export default LoginPage;
