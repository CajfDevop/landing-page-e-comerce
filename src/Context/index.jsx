import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart Increment quantity
  const [countCart, setCountCart] = useState(0);

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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByTitle) {
      setFilteredItems(filteredItemsByTitle(items, searchByTitle));
    }
  }, [items, searchByTitle]);

  //Get a product by Category
  const [searchByCategory, setSearchByCategory] = useState(null);

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByCategory) {
      setFilteredItems(filteredItemsByCategory(items, searchByCategory));
    }
  }, [items, searchByCategory]);

  const value = useMemo(() => ({
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
  }), [
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
  ]);


  return (
    <ShoppingCartContext.Provider  value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
