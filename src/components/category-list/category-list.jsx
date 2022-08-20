import './category-list.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component'
import React from 'react'

function CategoryList({ categories }) {
  return (
    <div className="categories-container">
      {
        categories.map((category) => (
          <DirectoryItem key={category.title} category={category} />
        ))
      }


    </div>
  )
}

export default CategoryList