import React from 'react'
import {useSelector} from 'react-redux'
import Homecard from '../component/Homecard'

const Home = () => {
  const productData = useSelector((state) =>state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(1,5)
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' alt='bikeicon' className='h-7'/>
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fastest Delivery in <span className='text-red-500'>Your Home</span></h2>
          <p className='py-3 text-base'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md '>Order Now</button>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
           homeProductCartList[0] && homeProductCartList.map(el =>{
              return(
                <Homecard
                  key={el._id}
                  image = {el.image}
                  name = {el.name}
                  price = {el.price}
                  category = {el.category}
                />  
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Home