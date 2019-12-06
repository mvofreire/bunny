import { User } from 'models'

const list = async (req, res) => {
    const data = await User.findAll()
    res.json(data)
}

const detail = async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!!user) {
        res.json(user)
    } else {
        res.status(404).send('User not found!')
    }
}

const create = async (req, res) => {
    const { name } = req.body
    const newUser = await User.create({ name })
    res.json(newUser)
}

const update = async (req, res) => {
    const { id } = req.params
    const data = req.body

    const user = await User.findByPk(id)
    if (!!user) {
        await user.update(data)
        res.json(user)
    } else {
        res.status(404).send('User not Found!')
    }
}

const remove = async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!!user) {
        await user.destroy()
        res.status(200).send()
    } else {
        res.status(404).send('User not Found!')
    }
}

export default {
    list,
    create,
    update,
    remove,
    detail,
}
