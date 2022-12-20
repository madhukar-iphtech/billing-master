import React, { useState, useEffect } from "react";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { Formik } from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email("please enter valid email address")
    .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
  password: yup
    .string()
    .required()
    .max(12, "you can enter only 12 characters")
    .min(5, "Enter Atleast 5 characters"),
});

function Login() {
  const navigate = useNavigate();

  const { handleSubmit, formState } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const changeIcon = passwordShown === true ? false : true;

  const [isDisabled, setIsDisabled] = useState(false);
  const [state, setState] = useState(false);
  const { isSubmitting } = formState;
  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const submit = (value) => {
    console.log("value===", value);

    axios
      .post("https://ebilling.iphtechnologies.com/API/api/login", {
        email: value.email,
        password: value.password,
      })
      .then((result) => {
        console.log(result);
        // toast.success("You have login Successfully", {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        navigate("/Home");
        localStorage.setItem("user-info4343657897", JSON.stringify(value));

        window.location.reload();

        //this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        toast.error("Login Credentials does not match", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsDisabled(true);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };
  console.log(Formik);
  return (
    <div className="tops">
      <Container>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="submain">
            <div className="fullscreen">
              <div className="responsive">
                <Row>
                  <Col>
                    <div className="login">
                      <div className="txt1">Welcome to Login</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Container
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Formik
                            validationSchema={schema}
                            noValidate
                            onSubmit={(formvalue) => {
                              handleSubmit(submit(formvalue));
                            }}
                            initialValues={{
                              email: "",
                              password: "",
                            }}
                          >
                            {({
                              handleSubmit,
                              handleChange,
                              handleChange2,
                              handleBlur,
                              values,
                              touched,
                              isValid,
                              errors,
                              isSubmitting,
                            }) => (
                              <Form
                                noValidate
                                onSubmit={handleSubmit}
                                style={{
                                  width: "70%",
                                  marginTop: "30px",
                                }}
                              >
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>
                                    Email
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "15px",
                                      }}
                                    >
                                      &#42;
                                    </span>
                                  </Form.Label>
                                  <Form.Control
                                    style={{ borderRadius: "20px" }}
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    placeholder="abc12@iphtechnologies.com"
                                    className="txtfield"
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                  />
                                  <Form.Control.Feedback
                                    type="invalid"
                                    style={{
                                      fontSize: "12px",
                                      marginTop: "-1px",
                                    }}
                                  >
                                    {errors.email}
                                  </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                  style={{ borderRadius: "20px" }}
                                >
                                  <Form.Label>Password</Form.Label>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      // borderRadius: "20px",
                                    }}
                                  >
                                    <Form.Control
                                      // required
                                      style={{
                                        position: "static",
                                        borderRadius: "inherit",
                                        borderTopLeftRadius: "20px",
                                        borderBottomLeftRadius: "20px",
                                      }}
                                      name="password"
                                      type={passwordShown ? "text" : "password"}
                                      placeholder="Password"
                                      className="txtfield"
                                      value={values.password}
                                      onChange={handleChange}
                                      maxLength={13}
                                      isInvalid={!!errors.password}
                                    />
                                    <InputGroup.Text
                                      id="basic-addon1"
                                      style={{
                                        borderRadius: "inherit",
                                        borderTopRightRadius: "20px",
                                        borderBottomRightRadius: "20px",
                                      }}
                                    >
                                      <span
                                        className="icon"
                                        onClick={() => {
                                          setPasswordShown(changeIcon);
                                        }}
                                      >
                                        {changeIcon ? (
                                          <AiOutlineEyeInvisible />
                                        ) : (
                                          <AiOutlineEye />
                                        )}
                                      </span>
                                    </InputGroup.Text>
                                  </div>

                                  <Form.Control.Feedback
                                    type="invalid"
                                    style={{
                                      fontSize: "12px",
                                      marginTop: "-2px",
                                    }}
                                  >
                                    {errors.password}
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCheckbox"
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Remember me"
                                    />
                                    <Form.Text>
                                      <a href="#" className="linktxt">
                                        Forgot password?
                                      </a>
                                    </Form.Text>
                                  </div>
                                </Form.Group>
                                <Button
                                  style={{
                                    borderRadius: "20px",
                                    width: "100%",
                                    backgroundColor: "blue",
                                  }}
                                  className="mt-4"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  Login
                                </Button>
                                <ToastContainer />
                                <div className="mt-3">
                                  <Form.Text className="txt2">
                                    Not registered yet?
                                  </Form.Text>
                                  <a
                                    href="http://192.168.1.170:3000/"
                                    className="linktxt"
                                  >
                                    Create an Account
                                  </a>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </Container>
                      </div>
                    </div>
                  </Col>
                  <Col className="noneimg">
                    <img src="/images/loginimg.png" className="img" />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
