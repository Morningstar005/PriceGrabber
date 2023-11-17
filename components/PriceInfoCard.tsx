import Image from 'next/image';
import React from 'react'


interface Props{
    title:string;
    iconssrc:string;
    value:string,

}
const PriceInfoCard = ({title,iconssrc,value}:Props) => {
  return (
    <div className={`price-info_card`}>
        <p className='text-base text-black-100'>
            {title} </p>
            <div className='flex gap-1'>
                <Image
                src={iconssrc}
                alt={title}
                width={24}
                height={24}
                className=' w-auto h-auto'
                />
                <p className='text-2xl font-bold text-secondary'>
                    {value}
                </p>

            </div>
       
    </div>
  )
}

export default PriceInfoCard