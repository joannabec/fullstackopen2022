import styled from 'styled-components'

export const Header = styled.header`
  background-color: #040d30;
  color: #fff;
  padding: 20px 0;
`
export const Container = styled.div`
  max-width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Nav = styled.nav`
  display: flex;
  gap: 10px;

  a {
    color: #fff;
  }
`
export const Button = styled.button`
  background: ${props => (props.secondary ? '#FFF' : '#CBCDDA')};
  color: #040d30;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${props => props.secondary ? 'rgba(255,255,255, 0.9)' : 'rgba(85,90,122, 0.4)'};
  }
`
export const ButtonAction = styled(Button)`
  background: #040d30;
  color: #fff;

  &:hover {
    background: rgba(4, 13, 48, 0.8);
  }
`
export const User = styled.span`
  color: #d1d7ff;
  padding-right: 10px;
`
export const Form = styled.form`
  margin: 10px 0;

  div {
    margin-bottom: 10px;
  }

  label {
    display: inline-block;
    width: 60px;
  }

  input {
    padding: 5px;
    width: 300px;
  }
`
export const BlogStyle = styled.div`
  display: inline-block;
  width: 30%;
  padding: 10px;
  border: 1px solid #000;
  margin: 15px 0 0 0;

  a {
    text-decoration: none;
  }
`
export const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;

  span {
    margin-right: 5px;
  }

  button {
    margin: 5px 0;
  }
`
export const CommentsContainer = styled.div`
  ul {
    padding: 20px;
  }

  input {
    width: 250px;
    padding: 4px;
    margin-right: 10px;
  }
`
export const TableUsers = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  display: table-cell;

  tr {
    border-bottom: 1px solid #cdcdcd;
  }

  td,
  th {
    padding: 10px;
  }
`
export const Alert = styled.div`
  margin: 10px 0;
  span {
    color: ${props => (props.type === 'error' ? 'red' : 'green')};
    font-size: 20px;
    display: inline-block;
    border-width: 10px;
    border-radius: 5px;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => (props.type === 'error' ? 'red' : 'green')};
  }
`
