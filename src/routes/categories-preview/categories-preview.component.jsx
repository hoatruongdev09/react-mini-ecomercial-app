import { useContext, Fragment } from 'react'
import { CategoriesContext } from '../../contexts/category.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((key) => (
                    <CategoryPreview key={key} title={key} items={categoriesMap[key]} />
                ))
            }
        </Fragment>
    )
}

export default CategoriesPreview