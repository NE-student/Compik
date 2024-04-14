import "./Login.css";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../../redux/slices/Auth";
import { Navigate } from "react-router-dom";

import { FormField, Form, Header, Divider, Button } from 'semantic-ui-react'

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "oleg777gunko@gmail.com",
      password: "123456",
    },
    mode: "onChange"
  });

  const OnSubmit = async(params) =>{
    dispatch(fetchAuth(params));
  }
  
  if(isAuth){
    return <Navigate to="/" />
  }
  

  return (
    <div className="py-9 min-w-96 w-1/5 px-16 bg-white grid gap-4 grid-cols-1 font-medium content-center rounded-3xl">
        <div className="grid gap-4 grid-cols-1">
          <Header className="text-slate-50 text-3xl text-center font-sans">
            Вхід в акаунт
          </Header>
        </div>
        <Divider />
      <Form onSubmit={handleSubmit(OnSubmit)}>
        <FormField className="">
          <label className="text-slate-50">Email:</label>
          <input
            {...register("email", {required: "Email is required.", })}
            className="pl-2 w-full border-2 rounded font-normal"
            placeholder="example@gmail.com"
            type="email"
          />
        </FormField>
        <FormField>
          <label className="text-slate-50">Пароль:</label>
          <input
            className="pl-2 w-full border-2 rounded font-normal"
            {...register("password", {required: "Password is required.", })}
            type="password"
          />
        </FormField>
        <div className="flex items-center justify-center">
          <Button 
            color='pink'
            type="submit"
            className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white w-1/2 min-h-6 rounded-lg"
          >
            Увійти
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
