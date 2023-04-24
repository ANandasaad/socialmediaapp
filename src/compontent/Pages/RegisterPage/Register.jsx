import React, { useContext, useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignUp } from "../../Validation/ValidationForm";

import { GridLoader } from "react-spinners";
import { AuthContext } from "../../AppContext/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";


const initalValues = {
  name: "",
  email: "",
  password: "",
 
};

const Register = () => {
  const [isLoading,setLoading]=useState(false);
  const {registerWithEmailAndPassword}=useContext(AuthContext);
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isValid,
  } = useFormik({
    initialValues: initalValues,
    onSubmit: (values) => {
      console.log(values);
      if(isValid===true)
      {
        registerWithEmailAndPassword(values.name,values.email,values.password)
        setLoading(true);
      }
      else{
        setLoading(false)
        alert('Check your fields');
      }
    
    },
    validationSchema:SignUp
  });

  const navigate=useNavigate();

  useEffect(()=>{
    setLoading(true);
    onAuthStateChanged(auth,(user)=>{
     if(user){
       navigate("/");
       setLoading(false);
     }
     else
     {
       setLoading(false);

     }
    })
 },[navigate])

  console.log(errors);

  return !isLoading?(
    <>
    <div className="grid grid-cols-1 h-screen justify-items-center items-center">
      <div>
        <h1 className="text-[60px] font-extrabold font-roboto text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-blue-400">
          Mini-Social
        </h1>
      </div>
      <div className="mt-[-10px]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input size="lg" label="Name" type="text" name="name" id="name" 
                 autoComplete="off"
                 value={values.name}
                 onChange={handleChange}
                 onBlur={handleBlur}
              />
                {  errors.name && touched.name? <p className="text-red-500">{errors.name}</p> :null}
            </div>
            <div>
              <Input
                size="lg"
                label="Email"
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
                {  errors.email && touched.email? <p className="text-red-500">{errors.email}</p> :null}
            </div>
            <div>
              <Input
                type="password"
                size="lg"
                label="Password"
                name="password"
                id="password"
                autoComplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
                {  errors.password && touched.password? <p className="text-red-500">{errors.password}</p> :null}
            </div>
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
      </div>
    </div>
    </>
  ):<div className="grid grid-cols-1 h-screen justify-items-center items-center"><GridLoader color="#36a1d6"    size={44}  width={94} /></div>
};

export default Register;
