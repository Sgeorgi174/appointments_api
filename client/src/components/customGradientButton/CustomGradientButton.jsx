import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const CustomGradientButton = ({ buttonName, onClick, isLoading }) => {
  if (isLoading)
    return (
      <LoadingButton
        loading
        variant="contained"
        sx={{
          textTransform: "none",
          fontSize: 18,
          mt: 5,
          fontWeight: 700,
          width: 250,
          borderRadius: 35,
        }}
      >
        Загрузка
      </LoadingButton>
    );
  return (
    <Button
      sx={{
        textTransform: "none",
        fontSize: 18,
        mt: 5,
        fontWeight: 700,
        width: 250,
        borderRadius: 35,
        background: `linear-gradient(
      270deg,
      rgb(180, 37, 255),
      rgb(37, 207, 253) 97.046%
    )`,
      }}
      variant="contained"
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};
