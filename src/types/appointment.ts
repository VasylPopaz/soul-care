export interface Appointment {
  name: string;
  phone: string;
  email: string;
  time: string;
  comment: string;
  psychologist: {
    id: string;
    name: string;
  };
}
