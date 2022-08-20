import { useContext } from 'react'
import { CategoriesContext } from '../../contexts/category.context'
import CategoryList from "../../components/category-list/category-list";
import { Outlet } from "react-router-dom";
const Home = () => {
  const { categories } = useContext(CategoriesContext)
  return (
    <div>
      <Outlet />
      <CategoryList categories={categories} />
    </div>
  );
};

export default Home;
