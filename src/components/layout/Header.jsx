import { useAuth } from '../auth/useAuth.jsx';
import './Header.scss';

function Header({ title }) {
  // Initialisation ------------------------------
  const { loggedInUser } = useAuth();

  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <header>
      <h1>{title}</h1>
      {loggedInUser && <p className='welcome'>Welcome {loggedInUser.UserFirstname}</p>}
    </header>
  );
}

export default Header;
