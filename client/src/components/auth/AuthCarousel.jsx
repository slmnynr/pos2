import React from 'react'

const AuthCarousel = ({img,title,desc}) => {
  return (

    <div className="flex flex-col items-center justify-between h-full mb-10 ">
    <img src={img}
     alt=""
      className="w-[600px] h-[500px]" 
      />
    <h3 className="text-4xl text-white text-center font-bold">{title}</h3>
    <p className="mt-5 text-xl text-center text-white">{desc}</p>
  </div>

  )
}

export default AuthCarousel