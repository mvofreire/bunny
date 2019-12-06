import databaseConfig from '../config/database.json'
import Sequelize from 'sequelize'

const ENV = process.env.NODE_ENV || 'development'
const config = databaseConfig[ENV]

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

export default sequelize
export { Sequelize }
