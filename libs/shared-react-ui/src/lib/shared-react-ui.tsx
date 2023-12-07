import styled from 'styled-components'

/* eslint-disable-next-line */
export interface SharedReactUiProps {}

const StyledSharedReactUi = styled.div`
  color: pink;
`

export function SharedReactUi(props: SharedReactUiProps) {
  return (
    <StyledSharedReactUi>
      <h1>Welcome to SharedReactUi!</h1>
    </StyledSharedReactUi>
  )
}

export default SharedReactUi
