const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tax-hotline', 'root', 'Agsjhf85845@41', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql', etc.
});

// Execute raw SQL query
async function getUsers() {
    try {
        const users = await sequelize.query('SELECT * FROM users Where username like "%lexi%"', {
            type: sequelize.QueryTypes.SELECT,
        });
        console.log(users);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

// Call the function to execute the query
getUsers();