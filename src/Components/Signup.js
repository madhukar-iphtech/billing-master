// import React from "react";
// import "./Sign.css";
// import { useState, useEffect } from "react";
// import {
//   Button,
//   Col,
//   Container,
//   Form,
//   Row,
//   Table,
//   Image,
//   Card,
// } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// function SignUp() {
//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .required("Please Enter your First Name")
//       .min(2, "Too Short!")
//       .max(50, "Too Long!")
//       .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
//     lastName: Yup.string()
//       .min(2, "Too Short!")
//       .max(50, "Too Long!")
//       .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
//       .required("Please Enter your Last Name"),
//     email: Yup.string()
//       .email("Invalid email")
//       .required("Please Enter your Email"),

//     // email: Yup.string()
//     //   .matches(
//     //     /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, // or any other regex
//     //     "Enter correct email"
//     //   )
//     //   .required("Required"),

//     password: Yup.string()
//       .required("Please Enter your password")
//       .min(5, "Enter atleast 5 characters")
//       .max(12, "you can not enter more than 12 character")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//         "Must be One Uppercase, One Lowercase, One Number and One Special Case Character"
//       ),
//   });

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       signUp(values);
//       // alert(JSON.stringify(values, null, 2));
//       console.log(values);
//       localStorage.setItem("user-info", JSON.stringify(values));
//     },
//   });

//   const signUp = (Data) => {
//     // alert(Data.firstName);
//     axios(" https://ebilling.iphtechnologies.com/API/api/signup", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       data: {
//         firstname: Data.firstName,
//         lastname: Data.lastName,
//         email: Data.email,
//         password: Data.password,
//       },
//     })
//       .then(async (res) => {
//         alert(res.data.message);
//       })
//       .catch(async (error) => {
//         // console.log();
//         alert(`Error- ${error.response.data.message}`);
//       });
//   };

//   return (
//     <div className="App">
//       <Container>
//         <Card className="form-group my-5 " fluid>
//           <Row>
//             <Col className="form-group mx-5">
//               <form onSubmit={formik.handleSubmit}>
//                 <h3 className="Auth-form-title">Sign Up </h3>

//                 <div className="form-group mt-2">
//                   <label className="lable">First Name</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     name="firstName"
//                     className=" form-control "
//                     placeholder="first name"
//                     value={formik.values.firstName}
//                     onChange={formik.handleChange}
//                     // helperText={"Name needs to be 'a'"}
//                     // pattern="[A-Za-z]{3}"
//                   />

//                   {formik.errors.firstName && formik.touched.firstName ? (
//                     <div className="text-danger">{formik.errors.firstName}</div>
//                   ) : null}
//                 </div>

//                 <div className="form-group mt-2">
//                   <label className="lable">Last Name</label>
//                   <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     onChange={formik.handleChange}
//                     value={formik.values.lastName}
//                     className="form-control mt-1"
//                     placeholder="last name"
//                   />
//                   {formik.errors.lastName && formik.touched.lastName ? (
//                     <div className="text-danger">{formik.errors.lastName}</div>
//                   ) : null}
//                 </div>
//                 <div className="form-group mt-2">
//                   <label className="lable">Email address</label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="text"
//                     onChange={formik.handleChange}
//                     value={formik.values.email}
//                     className="form-control mt-1"
//                     placeholder="Email Address"
//                   />
//                   {formik.errors.email && formik.touched.email ? (
//                     <div className="text-danger">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div className="form-group mt-2">
//                   <label className="lable">Password</label>
//                   <input
//                     maxLength={13}
//                     id="password"
//                     name="password"
//                     type="password"
//                     onChange={formik.handleChange}
//                     className="form-control mt-1"
//                     placeholder="Password"
//                     value={formik.values.password}
//                   />
//                   {formik.errors.password && formik.touched.password ? (
//                     <div className="text-danger">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div className="d-grid gap-6 mt-1">
//                   <button type="submit" className="button">
//                     Submit
//                   </button>
//                 </div>
//                 <p className="text-center mt-4">
//                   Forgot <a href="#">password?</a>
//                 </p>
//                 <div className="text-center">
//                   If you are registered{" "}
//                   <span className="link-primary">Login </span>
//                 </div>
//               </form>
//             </Col>
//             <Col className="image">
//               <Image className="Auth-img" src="img.png" fluid />
//             </Col>
//           </Row>
//         </Card>
//       </Container>
//     </div>
//   );
// }
// export default SignUp;

import React from "react";

function Signup() {
  return <div>Signup</div>;
}

export default Signup;
