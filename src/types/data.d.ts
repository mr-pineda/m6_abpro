export type doctor = {
  name: string;
  specialty: string;
  description: string;
  years: number;
  services: string[];
};

export type user = {
  id: number;
  name: string;
  password: string;
  role: "admin" | "user" | "doctor";
};

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
