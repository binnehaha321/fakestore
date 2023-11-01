import React from 'react'
import { useParams } from 'react-router-dom'


const SingleProduct = () => {
  const { product_id } = useParams()
  console.log(product_id)
  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct