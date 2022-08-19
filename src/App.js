import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.component'
import NavigationBar from './routes/navigation/navigation.component'
import Authentication from './components/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import CheckOut from './routes/checkout/checkout.component'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route index={true} element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop' element={<Shop />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
