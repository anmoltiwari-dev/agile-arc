import React from 'react'
interface ButtonProps {
    onClick: () => void
}
export const Button = ({onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} data-testid="button-test">Button</button>
  )
}