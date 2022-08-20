import { createContext, useState, useEffect } from 'react'
import {
    addCollectionAndDocuments,
    getCategoriesAndDocuments,
    getCategories
} from '../utils/firebase/firebase.utils'

// import SHOP_DATA from '../shop-data'

export const CategoriesContext = createContext({
    categoriesMap: [],
    categories: []
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const initCategory = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
            const categories = await getCategories()
            setCategories(categories)
        }
        initCategory()
    }, [])

    const value = { categoriesMap, categories }

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
} 
