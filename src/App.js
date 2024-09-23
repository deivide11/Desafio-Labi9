import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Main from './components/Main/Main';
import NewCategory from './components/Categories/NewCategory';
import CategoryList from './components/Categories/CategoryList';
import NewProduct from './components/Main/NewProduct';
import CategoryDetail from './components/Categories/CategoryDetail';

import EmpEdit from './EmpEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/create" element={<NewCategory />} />
        <Route path="/product/create" element={<NewProduct />} />
        <Route path="/products/detail/:id" element={<CategoryDetail />} />
    
        <Route path="/employee/edit/:empid" element={<EmpEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
