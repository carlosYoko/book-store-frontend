import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PropTypes from 'prop-types';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="border border-slate-400 text-slate-400 px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

BackButton.propTypes = {
  destination: PropTypes.string.isRequired, // Esto valida que `destination` sea una cadena (string) y sea requerida.
};

export default BackButton;
