import { AiOutlineClose, AiOutlineCalendar } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] bg-black max-w-full h-[400px] border rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-slate-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-slate-300 text-2xl" />
          <h2 className="my-1 text-slate-400">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-slate-300 text-2xl" />
          <h2 className="my-1 text-slate-400">{book.author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <AiOutlineCalendar className="text-slate-300 text-2xl" />
          <h2 className="my-1 text-slate-400">{book.publishYear}</h2>
        </div>
        <p className="mt-4 text-slate-300">Lorem ipsum dolor sit.</p>
        <p className="my-2 text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
          nam cumque adipisci consequatur repudiandae laudantium? Veritatis,
          accusantium! Aliquid consequatur, obcaecati, recusandae laboriosam
          adipisci voluptates quas pariatur tempore voluptatum asperiores
          exercitationem!
        </p>
      </div>
    </div>
  );
};

BookModal.propTypes = {
  book: PropTypes.object,
  onClose: PropTypes.func,
};
export default BookModal;
