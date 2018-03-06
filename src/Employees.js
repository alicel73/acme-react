import React from 'react';

const Employees =({ allEmployees}) => {
    return (
        <ul>
            { allEmployees.map(employee => {
                return (
                    <li key={ employee.id }>{ employee.name }</li>
                );
            }) }
        </ul>
    );
};

export default Employees;