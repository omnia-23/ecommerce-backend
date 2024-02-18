export const findQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.find({})
		next()
	}
}

export const addQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.create(req.body)
		next()
	}
}

export const updateQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.updateMany({}, req.body)
		next()
	}
}

export const deleteQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.deleteMany({})
		next()
	}
}
