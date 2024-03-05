import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { Layout } from "../../Components/Layout";
import { OrderCard } from "../../Components/OrderCard";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1


  return (
    <Layout>
      <div className="flex w-80 items-center justify-center relative mb-2">
        <Link to="/my-orders" className=" absolute left-0">
          <ArrowUturnLeftIcon className="h-4 w-4 text-black cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className="flex flex-col w-120">
        {context.order?.[index].products.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            id={product.id}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
