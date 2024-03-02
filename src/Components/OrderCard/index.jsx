import { TrashIcon } from "@heroicons/react/24/solid";

const OrderCard = props => {
    const { id, imageUrl, title, price, removeProduct } = props
    return (
        <div className="flex justify-between items-center px-3 mb-3">
            <div className="flex justify-between items-center gap-2">
                <figure className="w-20 h-20">
                <img className="w-full h-full rounded-lg object-contain" src={imageUrl} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
                <p className="text-lg font-medium">${price}</p>
                <TrashIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => removeProduct(id)}
              ></TrashIcon>
            </div>
        
        </div>
    )
};

export { OrderCard }