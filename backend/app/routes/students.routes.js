module.exports = (app) => {
	const students = require('../controllers/students.controller')

	const router = require('express').Router()

	// Create a new studentsA
	router.post('/', students.create)

	// Retrieve all students
	router.get('/', students.findAll)

	// Retrieve all published students
	router.get('/published', students.findAllPublished)

	// Retrieve a single students with id
	router.get('/:id', students.findOne)

	// Update a students with id
	router.put('/:id', students.update)

	// Delete a students with id
	router.delete('/:id', students.delete)

	// Create a new students
	router.delete('/', students.deleteAll)

	app.use('/api/students', router)
}
