import styled from "styled-components"

export const Header = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #7DBF42;
  color: #FFF;
  height: 45px;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`

export const TableDetails = styled.div`
  overflow-x: auto;
  color: #000000;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
`

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const Input = styled.input`
  background-color: #FFFFFF;
  color: #000000;
  height: 30px;
  marginBottom: 5px;
`;

export const CancelButton = styled.button`
   width: 50%;
   margin-right: 5px;
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export type Column<T> = {
  key: keyof T
  label: string
}

export type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
}