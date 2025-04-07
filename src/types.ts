export type StudentType = {
  firstName: string
  lastName: string
  courses: CourseType[]
}

export type StudentsState = {
  students: StudentType[]
  loading: boolean
  fetchStudents: () => Promise<void>
}

export type CourseColumnKey = keyof CourseType ;
export type StudentColumnKey = keyof StudentType ;

export type CourseType = {
  code: string
  title: string
  description?: string
  students?: StudentType[]
}

export type CoursesState = {
  courses: CourseType[]
  loading: boolean
  fetchCourses: () => Promise<void>
}

export type FormType = {
    firstName: string,
    lastName: string,
    courseIds: string[]
  }
  