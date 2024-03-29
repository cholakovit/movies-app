// Styled Elements
import { styled } from "@mui/material/styles";

// MUI Elements
import { Box } from "@mui/material";

export const SkeletonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

export const SkeletonBox = styled(Box)({
  margin: "10px 20px",
});
