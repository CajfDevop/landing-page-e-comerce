import { useContext } from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import { OrderCard } from "../../Components/OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const removeProduct = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToadd = {
      date: new Date().toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.setOrder([...context.order, orderToadd]);
    context.setCartProducts([]);
    context.setSearchByTitle(null)
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      }  flex-col fixed right-0 top-13  border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-68px)] top-[68px]`}
    >
      <div className="flex justify-between items-center p-6 ">
        <h2 className=" font-medium text-xl">My Order</h2>
        <div>
          <XCircleIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          ></XCircleIcon>
        </div>
      </div>
      <div className=" overflow-y-scroll flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            id={product.id}
            removeProduct={removeProduct}
          />
        ))}
      </div>
      <div className="px-6 mb-2">
        <p className="flex  justify-between items-center mb-2">
          <span className=" font-medium">Total Price:</span>
          <span className=" font-medium text-2xl ">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="my-orders/last">
          <button
            className="w-full bg-black text-white py-3 rounded-lg mb-2"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};
export { CheckoutSideMenu };
