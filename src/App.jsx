import './App.css';

import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import ShowBook from './pages/ShowBook';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/books/create" element={<CreateBook />} />
      <Route path="/api/books/delete/:id" element={<DeleteBook />} />
      <Route path="/api/books/edit/:id" element={<EditBook />} />
      <Route path="/api/books/details/:id" element={<ShowBook />} />
    </Routes>
  );
}

export default App;
