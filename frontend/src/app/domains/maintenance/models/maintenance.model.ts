export interface Maintenance{
  _id: string,
  date: string,
  description: string,
  state: Boolean,
  neighborhood: string
}

export interface CreateMaintenanceDTO extends Omit<Maintenance, '_id'>{}
