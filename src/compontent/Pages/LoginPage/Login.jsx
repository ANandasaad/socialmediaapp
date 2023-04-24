import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { LoginSchema } from "../../Validation/ValidationForm";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../AppContext/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

const initalValues = {
    email:"",
  password:"",
};
const Login = () => {
  const [isLoading,setLoading]=useState(false);
  const {signInWithGoogle, loginWithEmailAndPassword}=useContext(AuthContext);
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
        navigate("/login");
        

      }
     })
  },[navigate])


  const {values,errors,handleBlur,handleChange,handleSubmit,touched,isValid} = useFormik({initialValues:initalValues,validationSchema:LoginSchema,
    onSubmit:(values)=>{
    
      if(isValid){
        loginWithEmailAndPassword(values.email, values.password);
        
        setLoading('true');
      }
      else{
        setLoading('false');
        alert("Check your input fields");
      }
      
    }
  });



  return !isLoading? (
    <div className="grid grid-cols-1 h-screen justify-items-center items-center">
      <div>
        <h1 className="text-[60px] font-extrabold font-roboto text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-blue-400">
          Mini-Social
        </h1>
      </div>
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            LOGIN
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Input
                label="Email"
                size="lg"
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            {  errors.email && touched.email? <p className="text-red-500">{errors.email}</p> :null}
            </div>
            <div className="mt-4 mb-2">
              <Input
                label="Password"
                size="lg"
                name="password"
                type="password"
                id="password"
                autoComplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
             {  errors.password&& touched.password?<p className="text-red-500">{errors.password}</p>:null}
            </div>
            <div>
              <Button
                variant="gradient"
                fullWidth
                className="mb-4"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth className="mb-4" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        

          <div className="mt-6 flex items-center font-roboto text-base justify-center">
            Don't have an account?
            <Link to="/register">
              <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
                Sign up
              </p>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  ):<div className="grid grid-cols-1 h-screen justify-items-center items-center"><GridLoader color="#36a1d6"    size={44}  width={94} /></div>

};

export default Login;
