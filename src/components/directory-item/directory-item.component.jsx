import React from 'react'
import './directory-item.styles.scss'
import { Link } from 'react-router-dom'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category
  return (
    <div className="directory-item-container">
      <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="body">
        <h2>{title}</h2>
        <Link to={`shop/${title.toLowerCase()}`}>
          <p>Shop now</p>
        </Link>
      </div>
    </div>
  )
}

export default DirectoryItem
