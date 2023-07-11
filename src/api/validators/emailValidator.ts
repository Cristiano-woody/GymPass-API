import isEmail from 'validator/lib/isEmail'

export const emailValidator = (email: string): boolean => {
  return isEmail(email)
}
