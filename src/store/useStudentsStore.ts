import { create } from 'zustand'
import { StudentsState } from '../types';

export const useStudents = create<StudentsState>((set) => ({
  students: [],
  loading: true,
  fetchStudents: async () => {
    try {
      const res = await fetch('http://localhost:8080/api/students'); // TODO: setup a file with all the endpoints pointing to prod or dev.
      const data = await res.json();
      
      set({ students: data })
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      set({ loading: false })
    }
  },
}))


