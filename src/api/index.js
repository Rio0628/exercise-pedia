import axios from 'axios';

export const createExercise = data => axios.post('/api/exercises', data);
export const getAllExercises = () => axios.get('/api/exercises');
export const deleteExercise = id => axios.delete(`/api/exercises/${id}`);
export const updateExercise = (id, data) => axios.put(`/api/exercises/${id}`, data);

export const createCategory = data => axios.post('/api/categories', data);
export const getAllCategories = () => axios.get('/api/categories');
export const deleteCategory = id => axios.delete(`/api/categories/${id}`);

const apis = { createExercise, getAllExercises, deleteExercise, updateExercise, createCategory, getAllCategories, deleteCategory };

export default apis;