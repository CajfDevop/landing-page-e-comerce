import { useState } from "react"
import { useEffect } from "react"
import { Layout } from "../../Components/Layout" 
import { Card } from "../../Components/Card" 
import { ProductDetail } from "../../Components/ProductDetail" 
import { CheckoutSideMenu } from "../../Components/CheckoutSideMenu"




function Home() {
  const [items, setItems] = useState(null)  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(response =>response.json())
        .then(data => setItems(data))
        .then(json=>console.log(json))
        

    }, [])
    return (
        <Layout>
          Home
          <div className='grid gap-10 grid-cols-4 w-full max-w-screen-lg '>
          {
            items?.map((item) => (
              <Card key={item.id} data={item}/>
            ))
          }
          </div>
          <ProductDetail />
          <CheckoutSideMenu />

        </Layout>
    )
  }
  
  export default Home