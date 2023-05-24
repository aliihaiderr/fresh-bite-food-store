import React, { useState } from 'react';
import {BsCloudUpload} from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/ImagetoBase64';

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
  const handleSubmit = (e)=>{
    e.preventDefault();
      console.log(data)
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' className='bg-slate-200 p-1 my-1' onChange={handleonchange} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleonchange}>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Icecream</option>
          <option>Dosa</option>
          <option>Pizza</option>
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
        <input type='text' name='price' className='bg-slate-200 p-1 my-1' onChange={handleonchange} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} name='description' className='bg-slate-200 p-1 my-1 resize-none' onChange={handleonchange} />
        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow my-2'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct