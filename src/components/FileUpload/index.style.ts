import { Container, styled } from "@mui/material";


export const FileUploadHolder = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
  margin: '100px 0 0 0'
});

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});