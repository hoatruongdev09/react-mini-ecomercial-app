import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.component'
import NavigationBar from './routes/navigation/navigation.component'
import SignIn from './components/sign-in/sign-in.component'

const App = () => {
  const Shop = () => {
    return (
      <h1>
        shop page
      </h1>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route index={true} element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
