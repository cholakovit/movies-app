import { Button, ButtonProps, Container, styled } from "@mui/material";


export const FileUploadHolder = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
  margin: '100px 0 0 0',
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

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary.lighter,
  backgroundColor: theme.palette.primary.black,
  '&:hover': {
    backgroundColor: theme.palette.primary.hoverBgButton,
  },
}));