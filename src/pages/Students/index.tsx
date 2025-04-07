import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useStudents } from '../../store/useStudentsStore'
import { useCoursesStore } from '../../store/useCoursesStore'
import {
  ActionButtonWrapper,
  Button,
  CancelButton,
  CheckLabel,
  CheckWrapper,
  FormContainer,
  Header,
  Input,
  StyledTable,
  TableContainer,
  TableDetails,
  Td,
  Th,
} from '../Courses/styles'
import {
  CourseColumnKey,
  CourseType,
  FormType,
  StudentColumnKey,
} from '../../types'

const columns: { key: StudentColumnKey; label: string }[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'courses', label: 'Courses' },
]

const courseColumns: { key: CourseColumnKey; label: string }[] = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Title' },
]

const CourseTable: React.FC<{ courses: CourseType[] }> = ({ courses }) => {
  return (
    <TableDetails>
      <StyledTable>
        <thead>
          <tr>
            <td>Code</td>
            <td>Title</td>
          </tr>
        </thead>
        <tbody>
          {courses.map((item, index) => (
            <tr key={index}>
              {courseColumns.map((col) => (
                <Td key={String(col.key)}>{String(item[col.key])}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableDetails>
  )
}

const Students = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const { students, loading, fetchStudents } = useStudents()
  const [showCourses, setShowCourses] = useState<boolean>(false)
  const [currentCourses, setCurrentCourses] = useState<CourseType[] | []>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const handleChange = (option: string) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    )
  }

  const [form, setForm] = useState<FormType>({
    firstName: '',
    lastName: '',
    courseIds: [],
  })
  const { courses } = useCoursesStore()

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handleModal = () => {
    setShowForm(!showForm)
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnCreate = async () => {
    try {
      // TODO: setup a file with all the endpoints pointing to prod or dev.
      const response = await fetch('http://localhost/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, courseIds: selectedCourses }),
      })

      if (response) {
        fetchStudents()
        handleModal()
      }
    } catch (error) {}
  }

  const isValidForm = () => form.firstName !== '' && form.lastName !== ''

  if (loading) {
    return <>Loading students...</>
  }

  return (
    <>
      <Header>
        <h2 style={{ fontWeight: 'bolder' }}>Students</h2>

        <Button onClick={handleModal}>Add student</Button>
      </Header>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={String(col.key)}>{col.label}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <Td key={String(col.key)}>
                    {col.key === 'courses' ? (
                      <button
                        onClick={() => {
                          if (item?.courses.length > 0) {
                            setShowCourses(true)
                            setCurrentCourses(item.courses)
                          }
                        }}
                      >{`See courses(${item[col.key].length})`}</button>
                    ) : (
                      String(item[col.key])
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <Modal isOpen={showForm}>
        <FormContainer>
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={handleOnChange}
          />

          <Input
            name="lastName"
            placeholder="Last Name"
            onChange={handleOnChange}
          />

          <CheckWrapper>
            {courses.map((option) => (
              <CheckLabel
                key={option.code}                
              >
                <input
                  type="checkbox"
                  value={option.code}
                  checked={selectedCourses.includes(option.code)}
                  onChange={() => handleChange(option.code)}
                />
                {option.title}
              </CheckLabel>
            ))}
          </CheckWrapper>

          <ActionButtonWrapper>
            <CancelButton
              onClick={() => {
                setShowForm(false)
              }}
            >
              Cancel
            </CancelButton>

            <button
              onClick={handleOnCreate}
              disabled={!isValidForm()}
              style={{
                backgroundColor: isValidForm() ? '#7DBF42' : '#BFD9AD',
                width: '50%',
              }}
            >
              Create Student
            </button>
          </ActionButtonWrapper>
        </FormContainer>
      </Modal>

      <Modal
        isOpen={showCourses}
        onClose={() => {
          setShowCourses(false)
        }}
      >
        <CourseTable courses={currentCourses} />
      </Modal>
    </>
  )
}

export default Students
