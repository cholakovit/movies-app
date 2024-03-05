// React Elements
import { FC } from "react";

// MUI Elements
import { Skeleton } from "@mui/material";
import { SkeletonBox, SkeletonContainer } from "./index.styles";

// Types
import { SkeletonProps } from "../../../types";

const Skeletons: FC<SkeletonProps> = ({ width, height, number }) => {
  return (
    <SkeletonContainer>
      {Array.from({ length: number }, (_, index) => (
        <SkeletonBox key={index} data-testid="skeletons">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={width}
            height={height}
          />
        </SkeletonBox>
      ))}
    </SkeletonContainer>
  );
};

export default Skeletons;
