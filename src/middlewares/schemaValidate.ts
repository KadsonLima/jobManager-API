import { ObjectSchema } from "joi"
import { NextFunction, Request, Response } from "express"

const schemaValidate = (schema: ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req, { abortEarly: false })
		if (error){
			return res
				.status(422)
				.send(error.details.map(({ message }) => message))
			}
		next()
	}
}

export default schemaValidate