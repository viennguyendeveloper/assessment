import { Button } from "@mui/material"

interface ICustomButton {
  title: string,
  onClick?: () => void,
  type?: "button" | "reset" | "submit"
}

function CustomButton({title, onClick, type = "button"}: ICustomButton) {
  return (
    <Button type={type}  variant="contained" onClick={onClick}>{title}</Button>
  )
}

export default CustomButton