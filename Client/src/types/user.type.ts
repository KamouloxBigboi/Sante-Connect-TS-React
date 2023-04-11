export default interface IUser {
  id?: any | null,
  username?: string | null,
  email?: string,
  password?: string,
  age?: number,
  gender?: string,
  occupation?: string,
  country?: string,
  roles?: Array<string>
}