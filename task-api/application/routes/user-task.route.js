import UserTaskController from '../controllers/user-task.controller'

export const UserTaskRouter = app => {
    app.route('/api/tasks/:user')
        .get(UserTaskController.list)
        .post(UserTaskController.create)

    app.route('/api/tasks/:id')
        .put(UserTaskController.update)
        .patch(UserTaskController.markDone)
        .delete(UserTaskController.remove)
}
