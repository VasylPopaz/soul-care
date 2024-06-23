export interface Appointment {
  name: string;
  phone: string;
  email: string;
  time: string;
  comment: string;
  psychologist: {
    _id: string;
    name: string;
  };
}
