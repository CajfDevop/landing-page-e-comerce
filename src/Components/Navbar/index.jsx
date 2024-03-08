import { useContext } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";
  // Sign Out
  const signOut = localStorage.getItem("sign-out");
  const parseSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parseSignOut;

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

  const handleSignOut = () => {
    const stringfiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringfiedSignOut);
    context.setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">{parsedAccount.email}</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              onClick={() => handleSignOut()}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Sign Out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            onClick={() => handleSignOut()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sign Out
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className="bg-white flex justify-between items-center fixed  z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <figure className="w-6 h-6">
          <img
            src="https://cdn2.iconfinder.com/data/icons/shopping-and-ecommerce-40/512/04_Shopping_App-256.png"
            alt="Shopi"
          />
        </figure>
        <li className="font-semibold text-lg">
          <NavLink to={`${isUserSignOut ? "sign-in" : "/"}`}>Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelery"
            onClick={() => context.setSearchByCategory("jewelery")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mens-clothing"
            onClick={() => context.setSearchByCategory("men's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Men&apos;s Clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/womens-clothing"
            onClick={() => context.setSearchByCategory("women's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Women&apos;s Clothing
          </NavLink>
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex justify-between gap-2 items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black"></ShoppingBagIcon>{" "}
          {context.cartProducts.length}{" "}
        </li>
      </ul>
    </nav>
  );
};
export { NavBar };
