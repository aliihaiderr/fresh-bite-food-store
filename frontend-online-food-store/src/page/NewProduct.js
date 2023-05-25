import React, { useState } from 'react';
import {BsCloudUpload} from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import {toast} from 'react-hot-toast';

const NewProduct = () => {
  const [data, setData] =useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  });

  const handleonchange = (e)=>{
      const {name,value} = e.target
      setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
      })
  }
  const uploadImage = async (e)=>{
      const data = await ImagetoBase64(e.target.files[0]);
      // console.log(data)
      setData((preve)=>{
          return{
            ...preve,
            image: data
          }
      })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
      console.log(data)

      const {name, image,category,price} = data

    if(name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      const fetchRes = await fetchData.json()
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Enter Required Fields");
    }
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' className='bg-slate-200 p-1 my-1' onChange={handleonchange} value={data.name} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleonchange} value={data.category}>
          <option value={'other'}>Select Category</option>
          <option value={'fruits'}>Fruits</option>
          <option value={'vegetable'}>Vegetables</option>
          <option value={'icecream'}>Icecream</option>
          <option value={'dosa'}>Dosa</option>
          <option value={'pizza'}>Pizza</option>
          <option value={'rice'}>Rice</option>
          <option value={'cake'}>Cake</option>
          <option value={'burger'}>Burger</option>
          <option value={'cheese'}>Cheese</option>
          <option value={'sandwich'}>Sandwich</option>
        </select>

        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200 rounded flex justify-center items-center cursor-pointer'>
            {
              data.image ? <img src={data.image} alt='productimg' className='h-full' /> : <span className='text-5xl'><BsCloudUpload /></span>
            }
              <input type='file' accept='image/*' id='image' onChange={uploadImage} className='hidden' />
          </div>
        </label>


        <label htmlFor='price' className='my-1'>Price</label>
        <input type='text' name='price' className='bg-slate-200 p-1 my-1' onChange={handleonchange} value={data.price} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} name='description' className='bg-slate-200 p-1 my-1 resize-none' onChange={handleonchange} />
        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow my-2'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct