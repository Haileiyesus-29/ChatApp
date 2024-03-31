import {Request, Response, NextFunction} from "express"

// Get user by
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  // Logic to get user by ID
  const userId = req.params.id
  const user = {
    id: userId,
    name: "John Doe",
    email: "johndoe@example.com",
  }

  // Send user data as response
  res.send(user)
}

//  a new user
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a new user
  const {name, email} = req.body
  const newUser = {
    id: "123",
    name,
    email,
  }

  // Send newly created user as response
  res.send(newUser)
}

// Update user by ID
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  // Logic to update user by ID
  const userId = req.params.id
  const {name, email} = req.body
  const updatedUser = {
    id: userId,
    name,
    email,
  }
  // Send updated user as response
  res.send(updatedUser)
}

// Delete user by ID
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  // Logic to delete user by ID
  const userId = req.params.id
  // Send success message as response
  res.send(`User with ID ${userId} has been deleted.`)
}
