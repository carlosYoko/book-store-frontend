import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { backendURL } from '../config/axiosConfig';
import { enqueueSnackbar } from 'notistack';

const EditBook = () => {
  const initialState = {
    title: '',
    author: '',
    publishYear: '',
  };
  const [book, setBook] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendURL}/${id}`)
      .then((res) => {
        setLoading(false);
        setBook(res.data);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error al cargar el libro', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    setLoading(true);
    axios
      .put(`${backendURL}/${id}`, book)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Libro editado correctamente!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error al cargar los libros', { variant: 'error' });
        console.log(error);
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  return (
    <div className="p-4">
      <BackButton destination="/" />
      <h1 className="text-3xl my-4 text-slate-400">Editar libro</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-slate-600 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-2">
          <label htmlFor="myTitle" className="text-xl mr-4 text-slate-300">
            Título:
          </label>
          <input
            type="text"
            name="title"
            id="myTitle"
            value={book.title}
            onChange={handleChangeInput}
            className="border-2 border-gray-500 px-4 py-2 w-full text-slate-400 bg-zinc-800 rounded-md"
          />
        </div>
        <div className="my-2">
          <label htmlFor="myAuthor" className="text-xl mr-4 text-slate-300">
            Autor:
          </label>
          <input
            type="text"
            name="author"
            id="myAuthor"
            value={book.author}
            onChange={handleChangeInput}
            className="border-2 border-gray-500 px-4 py-2 w-full text-slate-400 bg-zinc-800 rounded-md"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="myPublishYear"
            className="text-xl mr-4 text-slate-300"
          >
            Año publicación:
          </label>
          <input
            type="number"
            name="publishYear"
            id="myPublishYear"
            value={book.publishYear}
            onChange={handleChangeInput}
            className="border-2 border-gray-500 px-4 py-2 w-full text-slate-400 bg-zinc-800 rounded-md"
          />
        </div>
        <button
          className="p-2 bg-slate-400 hover:bg-slate-300 m-8 rounded-md"
          onClick={handleEditBook}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default EditBook;
