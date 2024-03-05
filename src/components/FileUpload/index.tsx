import { FC } from "react";
import { useFileReader } from "../../helper/hooks";
import {
  FileUploadHolder,
  StyledButton,
  VisuallyHiddenInput,
} from "./index.style";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Constants
import { UPLOAD_FILE } from "../../helper/constants";

const MoviesUploader: FC = () => {
  const { handleFileChange } = useFileReader();
  return (
    <FileUploadHolder>
      <StyledButton
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {UPLOAD_FILE}
        <VisuallyHiddenInput
          type="file"
          accept=".txt"
          onChange={handleFileChange}
        />
      </StyledButton>
    </FileUploadHolder>
  );
};

export default MoviesUploader;
