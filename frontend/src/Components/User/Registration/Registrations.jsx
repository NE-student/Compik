import './Registration.css';

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../../redux/slices/Auth";
import { Navigate } from "react-router-dom";
import { FormField, Form, Header, Divider, Button, Container } from 'semantic-ui-react'

function Registration() {
  const dispatch = useDispatch();
  const registerSuccess = useSelector(state => state.auth.user?.success);
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      Nickname:"MLGPRO",
      email: "oleg777gunko@gmail.com",
      password: "123456",
    },
    mode: "onChange"
  });

  const OnSubmit = async(params) =>{
    await dispatch(fetchRegister(params));
    
  }
  
  if(isAuth){
    return <Navigate to="/" />
  }


  return (
    <>
  {!registerSuccess?
    <div className="py-9 min-w-96 w-1/5 px-16 bg-white grid gap-4 grid-cols-1 font-medium content-center rounded-3xl">
      <div className='grid gap-4 grid-cols-1'>
        <Header className='text-slate-50 text-3xl text-center font-sans'>Реєстрація</Header>
      </div>
      <Divider />
      <Form onSubmit={handleSubmit(OnSubmit)}>
        <FormField className=''>
          <label className='text-slate-50'>Нік:</label>
          <input {...register("Nickname", {required: "Nickname is required.", })} className='pl-2 w-full border-2 rounded font-normal' placeholder='example@gmail.com'/>
        </FormField>
        <FormField className=''>
          <label className='text-slate-50'>Email:</label>
          <input {...register("email", {required: "Email is required.", })} className='pl-2 w-full border-2 rounded font-normal' placeholder='example@gmail.com'/>
        </FormField>
        <FormField>
          <label className='text-slate-50'>Пароль:</label>
          <input {...register("password", {required: "Password is required.", })} className='pl-2 w-full border-2 rounded font-normal' type='password'/>
        </FormField>
        <div className='flex items-center justify-center'>
        <Button 
            color='pink'
            type="submit"
            className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white w-1/2 min-h-6 rounded-lg"
          >
            Зареєструватись
          </Button>
        </div>
      </Form>
      </div>
      :
      <div className="py-9 min-w-96 w-1/5 px-16 bg-white grid gap-4 grid-cols-1 font-medium content-center rounded-3xl">
      <div className='grid gap-4 grid-cols-1'>
        <Header className='text-slate-50 text-3xl text-center font-sans'>Крок 2. Верифікація.</Header>
      </div>
      <Divider />
      <Container>
        Вітаю, крок 1 завершений! Перевірте пошту, та знайдіть лист від PC_Configurator, та перейдіть за посиланням в ньому, щоб завершити реєстрацію(Поки крок 2 не завершиться, ваші можливості будуть обмежені).
      </Container>
      </div>}
    </>
  );
}

export default Registration;
