import axios from 'axios';
import Spinner from '../components/Spinner';
import {
  AiOutlineUser,
  AiTwotoneCalendar,
  AiOutlineMedium,
  AiOutlineRedo,
  AiOutlineTable,
  AiOutlineIdcard,
} from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';
import { backendURL } from '../config/axiosConfig';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksTable from '../home/BooksTable';
import BooksCards from '../home/BooksCards';
import { useSEO } from '../hooks/useSEO';

import { enqueueSnackbar } from 'notistack';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('');
  const [showType, setShowType] = useState(
    localStorage.getItem('viewType') || 'table'
  );

  useSEO({
    title: `[${books.length}] Book Store`,
    description: 'Añadir y eliminar libros de una lista (CRUD)',
  });

  let styleIconsTypeFormat = 'text-slate-300 text-4xl cursor-pointer';

  const loadData = () => {
    setLoading(true);
    axios
      .get(backendURL)
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar('Error al cargar los libros', { variant: 'error' });
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClickOrder = (orden) => {
    setLoading(true);
    axios
      .get(`${backendURL}?ordenar=${orden}`)
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <AiOutlineTable
          className={
            showType === 'table'
              ? styleIconsTypeFormat
              : 'text-slate-400 hover:text-slate-300 text-4xl cursor-pointer'
          }
          title="Tabla"
          onClick={() => {
            localStorage.setItem('viewType', 'table');
            setShowType('table');
          }}
        />
        <AiOutlineIdcard
          className={
            showType === 'card'
              ? styleIconsTypeFormat
              : 'text-slate-400 hover:text-slate-300 text-4xl cursor-pointer'
          }
          title="Tabla"
          onClick={() => {
            localStorage.setItem('viewType', 'card');
            setShowType('card');
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-slate-400">Listado de libros</h1>
        <div className="flex flex-row ">
          <AiOutlineMedium
            className="text-sky-800 text-4xl cursor-pointer ml-4 hover:text-slate-300"
            title="Ordenar por título"
            onClick={() => {
              setOrder('title');
              handleClickOrder('title');
            }}
          />
          <AiOutlineUser
            className="text-sky-800 text-4xl cursor-pointer ml-4 hover:text-slate-300"
            title="Ordenar por autor"
            onClick={() => {
              setOrder('author');
              handleClickOrder('author');
            }}
          />
          <AiTwotoneCalendar
            className="text-sky-800 text-4xl cursor-pointer ml-4 hover:text-slate-300"
            title="Ordenar por año"
            onClick={() => {
              setOrder('year');
              handleClickOrder('year');
            }}
          />
          <AiOutlineRedo
            className="text-sky-800 text-4xl cursor-pointer ml-4 hover:text-slate-300"
            title="Ordenar por añadido"
            onClick={() => {
              setOrder('');
              loadData();
            }}
          />
          <Link to="/api/books/create">
            <MdOutlineAddBox
              className="text-green-400 text-4xl ml-4 hover:text-slate-300"
              title="Añadir nuevo libro"
            />
          </Link>
        </div>
      </div>

      {loading ? <Spinner /> : ''}
      {showType === 'table' && <BooksTable books={books} order={order} />}
      {showType === 'card' && <BooksCards books={books} order={order} />}
    </div>
  );
};

export default Home;
