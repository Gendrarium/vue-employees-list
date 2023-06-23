export type TLocation = [number, number, number?];

export interface IEmployee {
  fullName: string;
  age: string;
  location: TLocation;
  employer?: string;
  id: string;
}

export interface IFullNameVariable {
  value: string;
  unrestricted_value: string;
  data: {
    surname: null | string;
    name: string;
    patronymic: null | string;
    gender: string;
    source: null | string;
    qc: string;
  };
}
