import { BASE_URL } from '../baseUrl';
import APIClient from './APIClient';

const API_URL = process.env.NODE_ENV === 'development' ? BASE_URL.dev : BASE_URL.prod;

const header = {
  'Content-type': 'application/json',
};

export const develupAPIClient = new APIClient(API_URL, header);
