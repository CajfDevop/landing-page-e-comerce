import { useContext } from "react";
import { Layout } from "../../Components/Layout";
import { Card } from "../../Components/Card";
import { ProductDetail } from "../../Components/ProductDetail";
import { CheckoutSideMenu } from "../../Components/CheckoutSideMenu";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.isLoading) {
      return <div>Loading...</div>;
    }
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => (
        <Card key={item.id} data={item} />
      ));
    } else {
      return <div className=" text-gray-400 text-xl">Product Not Found</div>;
    }
  };

  return (
    <Layout>
      <div className="flex w-80 items-center justify-center relative mb-2">
        <h1 className=" font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        className="border border-gray-400 focus:outline-none rounded-lg w-80 p-2 mb-4"
        type="text"
        placeholder="Search a product"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />

      <div className="grid gap-10 grid-cols-4 w-full max-w-screen-lg ">
        {renderView()}
      </div>
      <ProductDetail />
      <CheckoutSideMenu />
    </Layout>
  );
}

export default Home;
