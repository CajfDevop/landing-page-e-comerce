import { useContext, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { Layout } from "../../Components/Layout";

function SignIn() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info");
  const form = useRef(null);
  const navigate = useNavigate();

  // Account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);

  // Has account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(false);

    navigate("/");
  };

  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // Create Account
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", stringifiedAccount);
    context.setAccount(data);

    //Sign in
    handleSignIn();
  };

  const renderLogIn = () => {
    return (
      <div className="flex flex-col gap-4 w-80">
        <p className=" text-gray-500 p-4">
          Sign in with your email and password
        </p>
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>

        <p>
          <span className="font-light text-sm">Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link to="/">
          <button
            className="bg-black disabled:bg-black/50 text-white border border-black/60 w-80 rounded-lg p-2"
            onClick={() => handleSignIn()}
            disabled={!hasUserAnAccount}
          >
            Log in
          </button>
        </Link>
        <div className="text-center">
          <a className=" underline underline-offset-4 font-light" href="/">
            Forgot your password?
          </a>
        </div>
        <button
          className="bg-black disabled:bg-black/50 text-white border border-black/60 w-80 rounded-lg p-2"
          onClick={() => setView("create-user-info")}
          disabled={hasUserAnAccount}
        >
          Sign up
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="First name"
            className="border border-black/60 p-2 rounded-lg placeholder:font-light placeholder:text-sm focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="hi@helloworld.com"
            className="border border-black/60 p-2 rounded-lg placeholder:font-light placeholder:text-sm focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="********"
            className="border border-black/60 p-2 rounded-lg placeholder:font-light placeholder:text-sm focus:outline-none py-2 px-4"
          />
        </div>
        <Link to="/">
          <button
            className="bg-black disabled:bg-black text-white border border-black/60 w-full rounded-lg p-2"
            onClick={() => createAnAccount()}
          >
            Create
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogIn();

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Get started today!!</h1>

      {renderView()}
    </Layout>
  );
}

export default SignIn;
