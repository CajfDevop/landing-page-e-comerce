import PropTypes from 'prop-types';
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";


const OrdersCard = (props) => {
  const { totalPrice, totalProducts, orderDate } = props;

  return (
    <div className="flex  justify-between items-center px-3 mb-3 border border-gray-400 rounded-lg w-80 h-10">
      <p className="flex gap-4">
        <span className="flex gap-2">
          <ShoppingCartIcon className="h-6 w-6 text-black" />
          {totalProducts}
        </span>
        <span className="flex">
          <CurrencyDollarIcon className="h-6 w-6 text-black" />
          {totalPrice}
        </span>
        <span className="flex gap-2">
          <CalendarDaysIcon className="h-6 w-6 text-black" />
          {orderDate}
        </span>
        <ChevronRightIcon className="h-6 w-6" />
      </p>
    </div>
  );
};

OrdersCard.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
};
export { OrdersCard };
