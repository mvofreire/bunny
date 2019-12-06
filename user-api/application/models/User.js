import Model from 'components/Model'

class User extends Model {
    static tableName = 'user'

    static init(DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        })
    }
}

export default User
