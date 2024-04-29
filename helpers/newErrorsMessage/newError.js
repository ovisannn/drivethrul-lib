const EmailnotValid = new Error("Email that user entered is not valid")
const EmailAlreadyExist = new Error("Email user has been already registered")
const UsernameAlreadyExist = new Error("Username has been already exist")
const VideoDoesntExist = new Error("Video doesn't exist")
const UserDoesntExist = new Error("User Doesn't exist")
const ProductDoesntExist = new Error("Product Doesn't exist")
const DbFailed = new Error("Database failed")
const InvalidIdFormat = new Error("Invalid ID format request")
const InvalidCredentials = new Error("Invalid login Credentials")
const UnauthorizedError = new Error("Unauthorized")

export default {
    EmailnotValid,
    EmailAlreadyExist,
    UsernameAlreadyExist,
    VideoDoesntExist,
    UserDoesntExist,
    DbFailed,
    ProductDoesntExist,
    InvalidIdFormat,
    InvalidCredentials,
    UnauthorizedError
}