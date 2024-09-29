import './App.css';
import './Tailwind.css';
import './Reset.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import NewCategory from './components/Categories/NewCategory';
import CategoryList from './components/Categories/CategoryList';
import NewProduct from './components/Main/NewProduct';
import ProductDetail from './components/Main/ProductDetail';
import EditProduct from './components/Main/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/create" element={<NewCategory />} />

        <Route path="/product/create" element={<NewProduct />} />
        <Route path="/products/detail/:id" element={<ProductDetail />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
