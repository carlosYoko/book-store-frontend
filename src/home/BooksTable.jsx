import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import BookModal from './BookModal';
import { useState } from 'react';
import PropTypes from 'prop-types';

const BooksTable = ({ books, order }) => {
  const [showModal, setShowModal] = useState(false);
  const styles = {
    neutral: 'border border-slate-400 rounded-md text-slate-300 max-md:hidden',
    selected:
      'border border-slate-400 rounded-md text-slate-300 bg-gray-700 max-md:hidden',
  };

  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-400 rounded-md text-slate-300">
              No
            </th>
            <th
              className={order === 'title' ? styles.selected : styles.neutral}
            >
              Title
            </th>
            <th
              className={order === 'author' ? styles.selected : styles.neutral}
            >
              Autor
            </th>
            <th className={order === 'year' ? styles.selected : styles.neutral}>
              Año publicación
            </th>
            <th className="border border-slate-400 rounded-md text-slate-300">
              Operaciones
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-600 rounded-md text-slate-400 text-center">
                {i + 1}
              </td>
              <td className="border border-slate-600 rounded-md text-slate-400 text-center">
                {book.title}
              </td>
              <td className="border border-slate-600 rounded-md text-slate-400 text-center max-md:hidden">
                {book.author}
              </td>
              <td className="border border-slate-600 rounded-md text-slate-400 text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="border border-slate-600 rounded-md text-slate-400 text-center">
                <div className="flex justify-center gap-x-4">
                  <BiShow
                    className="text-3xl text-blue-700 hover:text-slate-300 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  />
                  <Link to={`/api/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-600" />
                  </Link>
                  <Link to={`/api/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/api/books/delete/${book._id} `}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
              {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BooksTable.propTypes = {
  books: PropTypes.array,
  order: PropTypes.string,
};

export default BooksTable;
