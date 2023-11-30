import { Link } from 'react-router-dom';

const Logo = ({ textColor = 'text-gray-600' }) => {
  return (
    <Link to={'/'} className="text-4xl font-bold text-gray-600 flex gap-1.5 items-center">
      <img src="/logo.png" alt="Logo" />
      <span className={`${textColor} max-md:hidden`}>MM Parcel</span>
    </Link>
  );
};

export default Logo;
