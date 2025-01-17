export interface User {
  _id?: number;
  name?: string | undefined | null;
  email?: string | undefined | null;
  status?: boolean;
  password?: string | undefined | null;
}
export interface CreateUserDTO extends Omit<User, '_id'> {}

export interface UpdateTreeDTO extends Partial<CreateUserDTO> {}
