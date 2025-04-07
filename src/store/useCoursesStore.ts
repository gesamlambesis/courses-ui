import { create } from 'zustand'
import { CoursesState } from '../types';

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  loading: true,

  fetchCourses: async () => {
    try {
      const res = await fetch('http://192.168.1.71:8080/api/courses'); // TODO: setup a file with all the endpoints pointing to prod or dev.
      const data = await res.json();
      set({ courses: data })
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
