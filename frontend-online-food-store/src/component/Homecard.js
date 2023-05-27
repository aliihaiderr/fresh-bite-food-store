import React from 'react';

const Homecard = ({name, image, category, price}) => {
  return (
    <div className='bg-white shadow-md p-2'>
        <div className='w-40 min-h-[150px]'>
            <img src={image} alt='img' className='h-full w-full'/>
        </div>
        <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{name}</h3>
        <p className='text-center text-slate-500 font-medium'>{category}</p>
        <p className='text-center font-bold'><span className='text-red-500'>₨</span><span> {price}</span></p>
    </div>
  )
}

export default Homecard