export interface ContactDto {
  id?: string;
  first_name: string;
  last_name: string;
  emailId: string;
  age: number | string | null;
  gender: string;
  mobilenumber: string | number;
  pan_no: string;
  adhaar_no: string;
  status: boolean | string;
  createdAt: string | number;
}
