import { UserTask } from 'models'

const list = async (req, res) => {
    const { user } = req.params
    const data = await UserTask.findAll({
        where: {
            user_id: user,
        },
    })
    res.json(data)
}
const create = async (req, res) => {
    const { user } = req.params
    const { description } = req.body

    const newTask = await UserTask.create({
        description,
        user_id: user,
    })
    res.json(newTask)
}

const update = async (req, res) => {
    const { id } = req.params
    const { description } = req.body

    const task = await UserTask.findByPk(id)
    if (!!task) {
        task.description = description
        await task.save()
        res.json(task)
    } else {
        res.status(404).send('Task not found!')
    }
}

const markDone = async (req, res) => {
    const { id } = req.params

    const task = await UserTask.findByPk(id)
    if (!!task) {
        task.state = true
        await task.save()
        res.json(task)
    } else {
        res.status(404).send('Task not found!')
    }
}

const remove = async (req, res) => {
    const { id } = req.params
    const task = await UserTask.findByPk(id)
    if (!!task) {
        await task.destroy()
        res.status(200).send()
    } else {
        res.status(404).send('Task not found!')
    }
}

export default {
    list,
    create,
    update,
    markDone,
    remove,
}
