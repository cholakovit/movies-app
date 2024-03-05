// React Elements
import { FC } from "react";

// MUI Elements
import { Alert, AlertColor } from "@mui/material";

// Custom Hooks
import { useAlertWithTimeout } from "../../helper/hooks";

// Types
import { AlertMessageProps } from "../../../types";

const AlertMessage: FC<AlertMessageProps> = ({ alert, type }) => {
  const displayAlert: string | null = useAlertWithTimeout({
    initialAlert: alert,
    timeout: 30000,
  });

  return displayAlert ? (
    <Alert severity={type as AlertColor} data-testid="alert">
      {displayAlert}
    </Alert>
  ) : null;
};

export default AlertMessage;
