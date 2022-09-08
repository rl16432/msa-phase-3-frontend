import { styled } from "@mui/material/styles"
import { TextField } from "@mui/material"

const LoginField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ffffff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#7f7f7f',
  },
  '& .MuiInputLabel-root': {
    color: "#c7c7c7",
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7f7f7f',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: "white"
  },
});

export default LoginField