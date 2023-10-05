import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { backendURL } from '../config/axiosConfig';
import { enqueueSnackbar } from 'notistack';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendURL}/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error al cargar el libro', { variant: 'error' });
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 ">
      <BackButton destination={'/'} />
      <h1 className="text-3xl my-4 text-slate-400">Información del libro</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-slate-600 rounded-xl w-fit p-4 mx-auto">
          <div className="my-2">
            <span className="text-xl mr-4 text-slate-300">Id:</span>
            <span className="text-slate-400">{book._id}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-slate-300">Título:</span>
            <span className="text-slate-400">{book.title}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-slate-300">Autor:</span>
            <span className="text-slate-400">{book.author}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-slate-300">
              Año publicación:
            </span>
            <span className="text-slate-400">{book.publishYear}</span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-slate-300">Añadido:</span>
            <span className="text-slate-400">
              {new Date(book.createdAt).toLocaleDateString('es-ES')}
            </span>
          </div>
          <div className="my-2">
            <span className="text-xl mr-4 text-slate-300">Actualizado:</span>
            <span className="text-slate-400">
              {new Date(book.updatedAt).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
