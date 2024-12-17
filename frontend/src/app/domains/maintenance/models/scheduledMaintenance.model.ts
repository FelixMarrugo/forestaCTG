export interface ScheduledMaintenance{
  _id: string;
  idMaintenance: string;
  idTree: string;
  description: string;
}

export interface CreateScheduledMaintenanceDTO extends Omit<ScheduledMaintenance, '_id'>{}
