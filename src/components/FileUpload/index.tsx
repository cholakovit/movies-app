import { FC } from 'react';
import { useFileReader } from '../../helper/hooks';
import { FileUploadHolder, VisuallyHiddenInput } from './index.style';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const MoviesUploader: FC = () => {
  const { handleFileChange } = useFileReader();
  return (
    <FileUploadHolder>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" accept='.txt' onChange={handleFileChange} />
      </Button>
    </FileUploadHolder>
  ) 
    
};

export default MoviesUploader;