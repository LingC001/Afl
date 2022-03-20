module.exports = (mongoose) => {
	const schema = mongoose.Schema(
		{
			phone: Number,
		},
		{ timestamps: true },
	)

	schema.method('toJSON', function () {
		const { __v, _id, ...object } = this.toObject()
		object.id = _id
		return object
	})

	const Students = mongoose.model('students', schema)
	return Students
}
