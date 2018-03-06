import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ employeeCount, managerCount, path })=> (
    <ul>
        <li>
            {
                path === '/' ? (
                    <span>Employees { employeeCount }</span>
                ): (
                    <Link to='/'>Employees { employeeCount }</Link>
                )
            }

        </li>
        <li>
            {
                path === '/managers' ? (
                    <span>Managers { managerCount }</span>
                ): (
                    <Link to='/managers'>Managers { managerCount } </Link>
                )
            }
        </li>

    </ul>
)

export default Nav;

//{ employees, managers, path }