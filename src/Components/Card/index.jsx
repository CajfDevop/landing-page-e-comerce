import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

const Card = (data) => {
  const context = useContext(ShoppingCartContext);
  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCountCart(context.countCart + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
  };

  const renderIcon = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div className="absolute bg-black top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center m-2 p-1 ">
          <CheckIcon className="h-6 w-6 text-white"></CheckIcon>
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center m-2 p-1  bg-gray-50 "
          onClick={(event) => addProductsToCart(event, data.data)}
        >
          <PlusIcon className="h-6 w-6 text-black"></PlusIcon>
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <img
          className=" w-full h-full  object-contain rounded-lg "
          src={data.data.image}
          alt=""
        />
        <span className="absolute bg-gray-100 bottom-0 left-0 m-2 rounded-lg text-xs px-3 py-0.5 ">
          {data.data.category}
        </span>
        {renderIcon(data.data.id)}
      </figure>
      <p className="flex justify-between items-center">
        <span className="text-xs font-light">{data.data.title}</span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export { Card };
