import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #FFFFFF;
  height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #FFFFFF;
`

const NavItem = styled(Link)<{ active?: boolean }>`
  text-decoration: none;
  color: ${({ active }) => (active ? '#7DBF42' : '#000000')};
  font-weight: bold;
  padding: 0.5rem 1rem;
  
  border-bottom: ${({ active }) => (active ? '0.5px solid #7DBF42;' : '0.5px solid #000000;')}; 

  &:hover {
    background-color: #7DBF42;
    color: #FFFFFF;
  }
`

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <SidebarContainer>
      <NavItem to="/" active={pathname === '/'}>
        Courses
      </NavItem>
      <NavItem to="/students" active={pathname === '/students'}>
        Students
      </NavItem>
    </SidebarContainer>
  )
}

export default Sidebar
