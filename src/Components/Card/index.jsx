import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'; 

const Card = (data) => {
    const context = useContext(ShoppingCartContext)
    return(
        <div className='bg-white cursor-pointer w-56 h-60 rounded-lg'>
            <figure className='relative mb-2'>
                <img className='w-full h-full rounded-lg object-cover' src={data.data.images[0]} alt=""/>
                <span className='absolute bg-white/60 bottom-0 left-0 m-2 rounded-lg text-xs px-3 py-0.5 '>{data.data.category.name}</span>
                <div
                    className='absolute bg-white top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center m-2 p-1'
                    onClick={() => context.setCountCart(context.countCart + 1)}>
                    +
                </div>
            </figure>
            <p className='flex justify-between items-center'>
                <span className='text-xs font-light'>{data.data.title}</span>
                <span className='text-lg font-medium'>${data.data.price}</span>
            </p>

        </div>
    )
};

export { Card }