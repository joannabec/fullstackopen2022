import styled, { css } from 'styled-components'

const baseStyle = css`
  color: #202020;
  font-family: 'Roboto Condensed', sans-serif;
`

const HeadingOne = styled.h1`
    font-size: 42px;
    margin-top: 25px;
    margin-bottom: 25px;
    ${baseStyle};
    @media (max-width: 480px) {
        font-size: 40px;
    }
`

const HeadingTwo = styled.h2`
    font-size: 36px;
    margin-bottom: 20px;
    ${baseStyle};
`

const HeadingThree = styled.h3`
    font-size: 28px;
    margin-bottom: 15px;
    ${baseStyle};
`

const HeadingFour = styled.h4`
    font-size: 22px;
    margin-bottom: 10px;
    ${baseStyle};
`

export const Heading = ({ h2, h3, h4, ...props }) => {
  if (h2) return <HeadingTwo {...props} />
  if (h3) return <HeadingThree {...props} />
  if (h4) return <HeadingFour {...props} />
  return <HeadingOne {...props} />
}