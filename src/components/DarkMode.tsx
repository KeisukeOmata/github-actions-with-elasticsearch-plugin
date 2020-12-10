import { useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import WbSunny from '@material-ui/icons/WbSunny'
import Brightness2Icon from '@material-ui/icons/Brightness2'

export const DarkMode: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const darkModeOn = () => {
    setDarkMode(true)
  }
  const darkModeOff = () => {
    setDarkMode(false)
  }
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {darkMode ? (
        <IconButton color="inherit" onClick={darkModeOff}>
          <WbSunny />
        </IconButton>
      ) : (
        <IconButton color="inherit" onClick={darkModeOn}>
          <Brightness2Icon />
        </IconButton>
      )}
    </ThemeProvider>
  )
}
