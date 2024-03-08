import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const ShoppingCartContext = createContext();

export const initLocalStorage = () => {
  const signOutLocalStorage = localStorage.getItem("sign-out");
  const accountLocalStorage = localStorage.getItem("account");
  let parseSignOut;
  let parseAccount;

  if (!signOutLocalStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false));
    parseSignOut = false;
  } else {
    parseSignOut = JSON.parse(signOutLocalStorage);
  }

  if (!accountLocalStorage) {
    localStorage.setItem("account", JSON.stringify({}));
    parseAccount = {};
  } else {
    parseAccount = JSON.parse(accountLocalStorage);
  }
};

export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart Increment quantity
  const [countCart, setCountCart] = useState(0);

  // Initial page load
  const [isLoading, setIsLoading] = useState(true);

  // Product Detail open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  //Product Detail Show product
  const [productToShow, setProductToShow] = useState({});

  //Shoppign Cart add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  //Shopping card creating a order
  const [order, setOrder] = useState([]);
  // Get a product
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  //Get a product by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  //Get a product by Category
  const [searchByCategory, setSearchByCategory] = useState(null);

  //Sign out
  const [signOut, setSignOut] = useState(false);

  //My Account
  const [account, setAccount] = useState({});

  useEffect(() => {
    setIsLoading(true); //start charging
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false); // charging ends
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(
      (item) => item.category.toLowerCase() === searchByCategory.toLowerCase()
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }
    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }
    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    if (!searchType) {
      return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory) {
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    }
    if (searchByTitle && !searchByCategory) {
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    }
    if (searchByCategory && !searchByTitle) {
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    }
    if (!searchByTitle && !searchByCategory) {
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
    }
  }, [items, searchByCategory, searchByTitle]);

  const value = useMemo(
    () => ({
      countCart,
      setCountCart,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      setFilteredItems,
      searchByCategory,
      setSearchByCategory,
      isLoading,
      signOut,
      setSignOut,
      account,
      setAccount,
    }),
    [
      countCart,
      isProductDetailOpen,
      productToShow,
      cartProducts,
      isCheckoutSideMenuOpen,
      order,
      items,
      searchByTitle,
      filteredItems,
      searchByCategory,
      isLoading,
      signOut,
      account,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
