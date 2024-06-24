const EmailnotValid = new Error("Email that user entered is not valid")
const EmailAlreadyExist = new Error("Email user has been already registered")
const UsernameAlreadyExist = new Error("Username has been already exist")
const UserDoesntExist = new Error("User Doesn't exist")
const DbFailed = new Error("Database failed")
const InvalidIdFormat = new Error("Invalid ID format request")
const InvalidCredentials = new Error("Invalid login Credentials")
const UnauthorizedError = new Error("Unauthorized")
const BookDoesntExist = new Error("Book doesn't exist")
const CopyDoesntExist = new Error("Book copy doesn't exist")
const CopyIsOccupied = new Error("Book copy is Occupied")
const LoanAlreadyCompleted = new Error("loan is already completed")


export default {
    EmailnotValid,
    EmailAlreadyExist,
    UsernameAlreadyExist,
    UserDoesntExist,
    DbFailed,
    InvalidIdFormat,
    InvalidCredentials,
    UnauthorizedError,
    BookDoesntExist,
    CopyDoesntExist,
    CopyIsOccupied,
    LoanAlreadyCompleted
}