const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_db');

const Employee = _conn.define('employee', {
    name: Sequelize.STRING
})

Employee.belongsTo(Employee, {as: 'manager'});
Employee.hasMany(Employee, {as: 'manages', foreignKey: 'managerId'})

const sync = ()=> {
    return _conn.sync({ force: true })
}

const seed = () => {
    return Promise.all([
        Employee.create({ name: 'moe' }),
        Employee.create({ name: 'larry' }),
        Employee.create({ name: 'curly' })
    ])
    .then(([moe, larry, curly]) => {
        return Promise.all([
            larry.setManager(moe),
            curly.setManager(moe)
        ])
    });
}  //if add larry.setManager(curly) AFTER larry.setManager(moe), Sequelize will set larry's manager to curly.  
    //MEANING THE LAST 'SETMANAGER' CODE SUPERSEDES THE ONES ABOVE IT!!

/*const seed = ()=> {
    return Promise.all([
        Employee.create({ name: 'moe' }),
        Employee.create({ name: 'larry' }),
        Employee.create({ name: 'curly' })
    ])
    .then(([blue, pink, purple]) => {
        return Promise.all([
            blue.setManager(pink),
            purple.setManager(pink)
        ])
    })
}*/
 //Using blue, pink, purple is equivalent to moe, larry and curly.  Sequelize is smart enough to associate blue as first row in table (with name 'moe').

module.exports = {
    sync,
    seed,
    models: {
        Employee
    }
}