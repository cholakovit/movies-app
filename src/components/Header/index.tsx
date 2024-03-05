// MUI Elements
import {
  HeaderAppBar,
  HeaderContainer,
  HeaderFormControlLabel,
  MaterialUISwitch,
} from "./index.style";

// Hooks
import { FC, useContext } from 'react';

// Context for the Theme
import { ColorModeContext } from '../../helper/Context';
import { colorModeProps } from "../../../types";

const Header: FC = () => {
  const colorMode: colorModeProps = useContext(ColorModeContext) || {};

  return (
    <HeaderAppBar>
      <HeaderContainer>
        <HeaderFormControlLabel
          label=""
          onClick={colorMode.toggleColorMode}
          control={<MaterialUISwitch defaultChecked />}
          data-testid="material-ui-switch"
        />
      </HeaderContainer>
    </HeaderAppBar>
  );
};

export default Header;
