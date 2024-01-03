import { Link } from "react-router-dom";
import { selectUser } from "../../redux/user/userSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector(selectUser);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">
          <Link to="/">Auth App</Link>
        </h1>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  className="h-7 w-7 rounded-full object-cover"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/signin"> SignIn </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
