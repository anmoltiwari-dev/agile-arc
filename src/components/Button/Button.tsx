import React from 'react'
interface ButtonProps {
    onClick: () => void
}
const Button = ({onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} data-testid="button-test">Button</button>
  )
}
