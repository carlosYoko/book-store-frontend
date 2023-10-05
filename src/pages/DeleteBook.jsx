import { useEffect, useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { backendURL } from '../config/axiosConfig';
import { enqueueSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const nameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${backendURL}/${id}`).then((res) => {
      nameRef.current = res.data.title;
      setIsLoading(false);
    });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${backendURL}/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Libro eliminado...', { variant: 'info' });

        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('No se pudo eliminar el libro...', {
          variant: 'error',
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/" />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-3xl my-4 text-slate-400">Eliminar libro</h1>
          {loading ? <Spinner /> : ''}
          <div className="flex flex-col items-center border-2 border-red-600 rounded-xl w-[600px] p-8 mx-auto">
            <h3 className="text-2xl text-slate-300">
              ¿Seguro que quieres eliminar {nameRef.current}?
            </h3>
            <button
              className="p-4 bg-red-600 text-whiter m-8 w-full rounded-md hover:bg-red-700"
              onClick={handleDeleteBook}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteBook;
