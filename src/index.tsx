import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Header from './components/header/header.component';
import ProductsList from './components/products/products-category.component';
import AboutUs from './components/about-us/about-us.component';
import Blog from './components/blog/blog.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route key={1} path='/' element={<App />}></Route>
      <Route key={2} path='/products/:category' element={<ProductsList />}></Route>
      <Route key={3} path='/about-us' element={<AboutUs />}> </Route>
      <Route key={4} path='/blog' element={<Blog />}> </Route>
    </Routes>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
