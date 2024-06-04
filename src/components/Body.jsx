import { Link } from "react-router-dom";
function Body() {
  return (
    <div>
       <Link to="/usermanagement" className="w-full p-3 transition-all ease-in-out border-2 hover:scale-95 rounded-xl">
        User Management
      </Link>
    </div>
  );
}

export default Body;
