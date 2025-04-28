export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export interface RegisterDataType {
  lastname: string
  firstname: string
  middlename?: string
  dateOfBirth?: Date
  email: string
  password: string
  role: UserRole
}

export interface RegisterResult {
  access_token: string
}

export interface LoginDataType {
  email: string
  password: string
}
