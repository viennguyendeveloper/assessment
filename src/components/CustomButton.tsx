import { Button, styled } from "@mui/material"

interface ICustomButton {
  title: string,
  onClick?: () => void,
  type?: "button" | "reset" | "submit"
}

const ButtonStyled = styled(Button)({
  borderRadius: "unset",
})

function CustomButton({title, onClick, type = "button"}: ICustomButton) {
  return (
    <ButtonStyled type={type}  variant="contained" onClick={onClick}>{title}</ButtonStyled>
  )
}

export default CustomButton