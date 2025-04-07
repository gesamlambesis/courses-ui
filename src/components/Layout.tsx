import styled from 'styled-components'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`

const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </Container>
  )
}

export default Layout
