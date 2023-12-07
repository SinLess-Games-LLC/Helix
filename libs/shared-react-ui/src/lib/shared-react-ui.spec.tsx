import { render } from '@testing-library/react'

import SharedReactUi from './shared-react-ui'

describe('SharedReactUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedReactUi />)
    expect(baseElement).toBeTruthy()
  })
})
