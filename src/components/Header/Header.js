import { NavLink } from "react-router-dom";

const Header = ({ newTaskOpen, setNewTaskOpen }) => {

    const newTaskHandler = () => {
        setNewTaskOpen(!newTaskOpen)
    }

    return (
        <div className='header'>
            <div className="header-content global-container">
                <div className="navigation">
                    <NavLink className='nav-btn' to=''>Todo</NavLink>
                    <NavLink className='nav-btn' to='/doing'>Doing</NavLink>
                    <NavLink className='nav-btn' to='/done'>Done</NavLink>
                </div>
                <div onClick={newTaskHandler} className="nav-btn">
                    New Task
                </div>
            </div>
        </div>
    )
}

export default Header;