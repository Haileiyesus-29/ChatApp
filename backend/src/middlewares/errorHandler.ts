import {Request, Response, NextFunction} from "express"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  //   console.trace(err)
  res.status(500).json({error: "Internal Server Error"})
}

export default errorHandler
