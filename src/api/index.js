import axios from 'axios';

export const createExercise = data => axios.post('/api/exercises', data);
export const getAllExercises = () => axios.get('/api/exercises');
export const deleteExercise = id => axios.delete(`/api/exercises/${id}`);
export const updateExercise = (id, data) => axios.put(`/api/exercises/${id}`, data);

const apis = { createExercise, getAllExewrcises, deleteExercise, updateExercise };

export default apis;