import Axios, { AxiosResponse } from 'axios';
import { IForm } from 'hooks/useForm';

const API_URL = process.env.REACT_APP_API_URI; // MAYBE WE CAN IMPORT IT FROM ENV

export const getSupervisors = (): Promise<AxiosResponse> => {
  return Axios.get(`${API_URL}/supervisors`);
};

export const submitForm = (formData: IForm): Promise<AxiosResponse> => {
  return Axios.post(`${API_URL}/submit`, formData);
};
