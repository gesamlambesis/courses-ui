import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useCoursesStore } from '../../store/useCoursesStore'
import {
  TableContainer,
  StyledTable,
  Td,
  Th,
  Header,
  Button,
  Input,
  CancelButton,
  ActionButtonWrapper,
  FormContainer,
  TableDetails,
} from './styles'
import { CourseColumnKey, StudentColumnKey, StudentType } from '../../types'

const columns: { key: CourseColumnKey; label: string }[] = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'students', label: 'Students' },
]

const studentColumns: { key: StudentColumnKey; label: string }[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
]

const StudentTable: React.FC<{ students: StudentType[] }> = ({ students }) => {
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
          {students.map((item, index) => (
            <tr key={index}>
              {studentColumns.map((col) => (
                <Td key={String(col.key)}>{String(item[col.key])}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableDetails>
  )
}

const Courses = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const { courses, loading, fetchCourses } = useCoursesStore()
  const [showStudents, setShowStudents] = useState<boolean>(false)
  const [currentStudents, setCurrentStudents] = useState<StudentType[] | []>([])
  const [form, setForm] = useState({
    code: '',
    title: '',
    description: '',
  })

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

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
      const response = await fetch('http://localhost/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response) {
        fetchCourses()
        handleModal()
      }
    } catch (error) {}
  }

  const isValidForm = () =>
    form.code !== '' && form.title !== '' && form.description

  if (loading) {
    return <>Loading courses...</>
  }

  return (
    <>
      <Header>
        <h2 style={{ fontWeight: 'bolder' }}>Courses</h2>

        <Button onClick={handleModal}>Add course</Button>
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
            {courses.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => {
                  return (
                    <Td key={String(col.key)}>
                      {col.key === 'students' ? (
                        <button
                          onClick={() => {
                            if (
                              item &&
                              item.students &&
                              item.students?.length
                            ) {
                              setShowStudents(true)
                              setCurrentStudents(item.students)
                            }
                          }}
                        >{`See students(${item[col.key]?.length})`}</button>
                      ) : (
                        item[col.key]
                      )}
                    </Td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <Modal isOpen={showForm}>
        <FormContainer>
          <Input name="code" placeholder="Code" onChange={handleOnChange} />
          <Input name="title" placeholder="title" onChange={handleOnChange} />
          <Input
            name="description"
            placeholder="description"
            onChange={handleOnChange}
          />

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
              Create Course
            </button>
          </ActionButtonWrapper>
        </FormContainer>
      </Modal>

      <Modal
        isOpen={showStudents}
        onClose={() => {
          setShowStudents(false)
        }}
      >
        <StudentTable students={currentStudents} />
      </Modal>
    </>
  )
}

export default Courses
