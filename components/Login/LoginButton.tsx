import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const LoginButton = styled(LoadingButton)({
  "&.MuiLoadingButton-loading": {
    border: "1px solid #7f7f7f !important",
    "& .MuiLoadingButton-loadingIndicator": {
      color: "#ffffff"
    }
  },
  "&.MuiLoadingButton-root": {
    border: "1px solid #ffffff",
    "&:hover": {
      border: "1px solid #7f7f7f"
    }
  }
});

export default LoginButton;
