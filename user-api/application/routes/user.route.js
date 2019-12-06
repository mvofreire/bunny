import UserController from '../controllers/user.controller'

export const UserRouter = app => {
    app.route('/api/users')
        .get(UserController.list)
        .post(UserController.create)

    app.route('/api/users/:id')
        .get(UserController.detail)
        .put(UserController.update)
        .delete(UserController.remove)
}
