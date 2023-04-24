
import *  as Yup from 'yup';


export const LoginSchema=Yup.object({
    email: Yup.string().email("Invalid Email address").required("Required email"),
    password: Yup.string()
      .required("Required password")
      .min("6", "Must be at least 6 characters")
      .matches(/^\d+$/, "Password can only contains numbers"),
})


export const SignUp=Yup.object({
    name:Yup.string().min("4","Must be at least 4 characters").max(25).required("Please enter your name").matches(/^[a-zA-Z]*$/,"Name can be contain letters"),
    email:Yup.string().email("Invalid Email address").required("Please enter Your email"),
    password: Yup.string()
    .required("Required password")
    .min("6", "Must be at least 6 characters")
    .matches(/^\d+$/, "Password can only contains numbers"),
   
})