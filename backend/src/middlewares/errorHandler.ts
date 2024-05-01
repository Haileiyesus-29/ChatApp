import {ErrorType} from "@/utils/types"
import {Request, Response, NextFunction} from "express"

const errorHandler = (err: Error & ErrorType, req: Request, res: Response, next: NextFunction) => {
  console.log(new Date(), "\n", err)
  res.status(err?.statusCode || 500).json(err)
}

export default errorHandler
