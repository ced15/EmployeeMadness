import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const isEquipmentPage = location.pathname === "/equipment";

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          {isEquipmentPage ? (
            <li>
              <Link to="/createequipment">
                <button type="button">Create Equipment</button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/create">
                <button type="button">Create Employee</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
