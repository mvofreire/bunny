'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_task', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            state: {
                type: Sequelize.BOOLEAN(),
                allowNull: false,
                defaultValue: '0',
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_task')
    },
}
