import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'; 
import axios from 'axios';

import Nav from './Nav';
import Employees from './Employees';

class App extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            managers: []
        };
    }
    componentDidMount() {
        axios.get('/api/employees')
            .then(result => result.data)
            .then(employees => {
                const managerMap = employees.reduce((memo, employee) => {
                    if (employee.manager) {
                        memo[employee.manager.id] = employee.manager;
                    }
                    return memo;
                }, {});
                console.log(managerMap);
                const managers = Object.keys(managerMap).map(key => managerMap[key]);
                console.log(managers);
                this.setState({ employees, managers })
                //same as this.setState({ employees: employees, managers: managers })
            });

    }
    render() {
        const { employees, managers } = this.state;
        return (
            <Router>
                <div>
                    <Route render = { ({ location }) => <Nav managerCount = { managers.length } employeeCount = { employees.length } path = { location.pathname }  /> } />
                    <Route path='/' exact render = { () => <Employees allEmployees={ employees } /> } />
                    <Route path ='/managers' exact render={ () => <Employees allEmployees={ managers } /> } /> 
                </div>
            </Router>
        );
    }

}



export default App;


