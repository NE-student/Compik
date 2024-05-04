import { useDispatch, useSelector } from "react-redux";
import "./Verification.css";
import { fetchEmailVerify, selectIsAuth } from "MyRedux/slices/Auth";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header } from "semantic-ui-react";

function Verification() {
  const queryParameters = new URLSearchParams(window.location.search);
  const emailToken = queryParameters.get("emailToken");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchEmailVerify(emailToken));
  }, [dispatch, emailToken]);

  const isAuth = useSelector(selectIsAuth);
  const Nickname = useSelector((state) => state.auth.user?.Nickname);

  console.log(isAuth);
  console.log(Nickname);

  return (
    <div className="flex-auto flex p-4">
      <div className="mx-auto h-fit py-9 min-w-96 w-1/5 px-16 bg-zinc-600 grid gap-4 grid-cols-1 font-medium content-center rounded-3xl">
        {!isAuth ? (
          <Container>
            <Header className="text-slate-50 text-3xl text-center font-sans">
              Verifying...
            </Header>
            <Divider />
            <p>Зачекайте трохи {":)"}</p>
          </Container>
        ) : (
          <Container>
            <Header className="text-slate-50 text-3xl text-center font-sans">
              Congratulation!
            </Header>
            <Divider />
            <p>Вітаю на сайті конфігурацію комп'ютера Compik, {Nickname} :D</p>
            <Link to="/">
              <Button
                color="pink"
                className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white w-1/2 min-h-6 rounded-lg"
              >
                Повернутись на головну сторінку.
              </Button>
            </Link>
          </Container>
        )}
      </div>
    </div>
  );
}

export default Verification;
