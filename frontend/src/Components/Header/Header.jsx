import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectIsAuth } from "MyRedux/slices/Auth";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Icon,
  Menu,
  MenuItem,
} from "semantic-ui-react";

function Header() {
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const OnClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  const OnProfileClick = () => {
    navigate("profile");
  };

  const OnSettingsClick = () => {
    navigate("settings");
  };
  const OnEditClick = () => {
    navigate("admin");
  };

  return (
    <header className="justify-self-start grid grid-cols-3 min-h-16 max-h-32 items-center bg-primary font-medium py-3 px-4 w-screen rounded-3 shadow-lg ring-1 ring-gray-900/5">
      <Link to="/">
        <div className="text-white fill-white  p-2 justify-self-start flex flex-row items-center space-x-3 transition ease-in-out delay-15 hover:text-text2 hover:fill-text2">
          <img
            className=" max-h-10"
            src={process.env.PUBLIC_URL + "/Compik.svg"}
            alt="logo"
          />
          <span className="text-xl ">Compik</span>
        </div>
      </Link>
      <div className="justify-self-center">
        {/* <Menu borderless className=" ">
          <MenuItem active={true}>
            Нова конфігурація
          </MenuItem>
          <MenuItem >
            Конфігурації
          </MenuItem>
        </Menu> */}
      </div>
      {isAuth ? (
        <div className="justify-self-end flex flex-col items-center pr-4">
          <button
            onClick={OnProfileClick}
            className="items-center w-12 h-12 bg-bg3 transition ease-in-out delay-15 hover:scale-110 active:bg-zinc-400 hover:bg-zinc-600 duration-200 text-violet-500  rounded-full border-2 border-white"
          >
            <img
              className=" fill-black max-h-8 m-auto"
              src={process.env.PUBLIC_URL + "/defaultProfileLogo.png"}
              alt="logo"
            />
          </button>
          <Dropdown
            className=" text-white"
            text={userData.Nickname}
            pointing="top right"
          >
            <DropdownMenu>
              <DropdownItem
                onClick={OnProfileClick}
                icon="user"
                text="Профіль"
              />
              <DropdownItem
                onClick={OnSettingsClick}
                icon="settings"
                text="Налаштування"
              />
              {userData.isAdmin && (
                <DropdownItem onClick={OnEditClick} icon="edit" text="Адмін панель" />
              )}

              <DropdownItem
                icon="sign-out"
                onClick={OnClickLogout}
                style={{
                  color: "red",
                  textDecoration: "none",
                }}
                text="Вийти за аккаунту"
              />
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className=" min-w-28 justify-self-end grid grid-cols-1 gap-2">
          <Link to="/login">
            <Button
              color="pink"
              className=" min-w-4 min-h-6 w-full transition ease-in-out delay-15 hover:scale-110 duration-200"
              type="button"
            >
              <Icon name="sign-in" />
              Увійти
            </Button>
          </Link>
          <Link to="/register">
            <Button
              className="min-w-20 min-h-6 w-full transition ease-in-out delay-15 hover:scale-110  duration-200 text-text1"
              type="button"
            >
              <Icon name="user" />
              Реєстрація
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
