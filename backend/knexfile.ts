import path from "path";
module.exports = {
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'dataBase', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'dataBase', 'migrations')
    },
    seed: {
        directory: path.resolve(__dirname,'src','dataBase','seeds')
    },
};