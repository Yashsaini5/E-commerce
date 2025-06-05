import React from 'react'

const item = (props) => {
  return (
    <div>
      <img src={props.image_url}/>
      <p>{props.name}</p>
      <p>{props.new_price}</p>
    </div>
  )
}

export default item
