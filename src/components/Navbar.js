import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = () => {

    const [activeItem, setActiveItem] = useState('')
    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    return (
        <Menu>
            <Menu.Item
                name='Home'
                active={activeItem === 'Home'}
                onClick={handleItemClick}
                as={Link} to={'/'}
            >
                Home
        </Menu.Item>

            <Menu.Item
                name='Add Todo'
                active={activeItem === 'Add Todo'}
                onClick={handleItemClick}
                as={Link} to={'/add'}
            >
                Add Todo
        </Menu.Item>

            <Menu.Item
                name='upcomingEvents'
                active={activeItem === 'upcomingEvents'}
                onClick={handleItemClick}
            >
                Upcoming Events
        </Menu.Item>
        </Menu>
    );
}

export default Navbar;