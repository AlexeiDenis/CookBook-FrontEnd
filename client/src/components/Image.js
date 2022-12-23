import React from 'react'

const Image = ({title, image, width, height}) => {
    const renderedImage =  !image ? (
        <img
          src="https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
          width={width}
          height={height}
          alt={`${title}`}
        ></img>
      ) : (
        <img src={`${image}`} width={120} height={120} alt={`${title}`}></img>
      )
  return renderedImage
  
}

export default Image