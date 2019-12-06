import Model from 'components/Model'

class UserTask extends Model {
    static tableName = 'user_task'

    static init(DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            state: {
                type: DataTypes.BOOLEAN(),
                allowNull: false,
                defaultValue: '0',
            },
            user_id: {
                type: DataTypes.INTEGER(),
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        })
    }
}

export default UserTask
