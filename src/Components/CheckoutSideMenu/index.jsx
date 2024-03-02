import { XCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { OrderCard } from "../../Components/OrderCard";
import { totalPrice } from "../../utils"

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const removeProduct = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };
  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      }  flex-col fixed right-0 border bg-white border-black rounded-lg w-[320px] h-[calc(100vh-68px)]`}
    >
      <div className="flex justify-between items-center p-6 w-full">
        <h2 className=" font-medium text-xl">My Order</h2>
        <div>
          <XCircleIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          ></XCircleIcon>
        </div>
      </div>
      <div className=" overflow-y-scroll">
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
      <div className="px-6">
            <p className="flex  justify-between items-center">
                <span className=" font-medium">Total Price:</span>
                <span className=" font-medium text-2xl ">${totalPrice(context.cartProducts)}</span>
            </p>
      </div>
    </aside>
  );
};
export { CheckoutSideMenu };
