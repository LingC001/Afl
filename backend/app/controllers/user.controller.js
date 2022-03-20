const db = require('../models')

const Students = db.students

// 用户登录
exports.login = (req, res) => {
	// Validate request
	if (!req.body.phone) {
		res.status(400).send({ message: 'Phone can not be empty!' })
		return
	}
	// 先判断登录角色
	const { role } = req.body
	// 如果是学生,先判断该用户是否存在
	if (role === 'student') {

	}
	// Create a Tutorial
	// const students = new Students({
	//     title: req.body.title,
	//     description: req.body.description,
	//     published: req.body.published ? req.body.published : false
	// });

	// Save Tutorial in the database
	// students
	//     .save(tutorial)
	//     .then(data => {
	//         res.send(data);
	//     })
	//     .catch(err => {
	//         res.status(500).send({
	//             message:
	//                 err.message || "Some error occurred while creating the Tutorial."
	//         });
	//     });
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({ message: 'Content can not be empty!' })
		return
	}

	// Create a Tutorial
	const tutorial = new Students({
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false,
	})

	// Save Tutorial in the database
	tutorial
		.save(tutorial)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while creating the Tutorial.',
			})
		})
}

// Retrieve all students from the database.
exports.findAll = (req, res) => {
	const { title } = req.query
	const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {}

	Tutorial.find(condition)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving students.',
			})
		})
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
	const { id } = req.params

	Tutorial.findById(id)
		.then((data) => {
			if (!data) res.status(404).send({ message: `Not found Tutorial with id ${id}` })
			else res.send(data)
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: `Error retrieving Tutorial with id=${id}` })
		})
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		})
	}

	const { id } = req.params

	Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
				})
			} else res.send({ message: 'Tutorial was updated successfully.' })
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating Tutorial with id=${id}`,
			})
		})
}

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
	const { id } = req.params

	Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
				})
			} else {
				res.send({
					message: 'Tutorial was deleted successfully!',
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Could not delete Tutorial with id=${id}`,
			})
		})
}

// Delete all students from the database.
exports.deleteAll = (req, res) => {
	Tutorial.deleteMany({})
		.then((data) => {
			res.send({
				message: `${data.deletedCount} students were deleted successfully!`,
			})
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while removing all students.',
			})
		})
}

// Find all published students
exports.findAllPublished = (req, res) => {
	Tutorial.find({ published: true })
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving students.',
			})
		})
}
