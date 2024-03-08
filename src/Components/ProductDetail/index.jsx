import { XCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      }  flex-col fixed right-0 border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-68px)] top-[68px]`}
    >
      <div className="flex justify-between items-center p-6 w-full">
        <h2 className=" font-medium text-xl">Detail</h2>
        <div>
          <XCircleIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeProductDetail()}
          ></XCircleIcon>
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg p-6 "
          src={context.productToShow.image}
          alt={context.productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6 w-full">
        <span className="text-2xl font-medium mb-2">
          ${context.productToShow.price}
        </span>
        <span className="text-sm font-medium mb-2">
          {context.productToShow.title}
        </span>
        <span className="text-sm font-light">
          {context.productToShow.description}
        </span>
      </p>
    </aside>
  );
};
export { ProductDetail };
