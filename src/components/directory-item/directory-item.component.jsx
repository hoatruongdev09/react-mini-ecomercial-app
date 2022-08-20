import React from 'react'
import './directory-item.styles.scss'

import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category

  const navigate = useNavigate()
  const route = `shop/${title}`
  const navigateToRoute = () => navigate(route.toLowerCase())

  return (
    <div onClick={() => navigateToRoute()} className="directory-item-container">
      <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="body">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}

export default DirectoryItem
