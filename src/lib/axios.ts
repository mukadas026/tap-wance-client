import axios from 'axios';

export const baseURL = 'http://localhost:7000/api/v1';
export const client = axios.create({
	baseURL: baseURL,
	withCredentials: true
});
