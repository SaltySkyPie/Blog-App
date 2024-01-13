import { useProfile } from '@app/modules/auth/utils/useProfile'
import { getLanguage, getLanguages, setLanguage } from '@app/modules/common/utils/i18next'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useSignOut } from 'react-auth-kit'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../../../Misc/Avatar'
import { StyledLink as Link } from '../../../Misc/Link.styled'
import { settings } from '../pages'

const UserMenu = ({ isSmallScreen }: { isSmallScreen: boolean }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { t } = useTranslation()

  const user = useProfile()

  const signOut = useSignOut()

  const navigate = useNavigate()

  const languages = getLanguages()

  const currentLanguage = getLanguage()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <Tooltip
        title={t('language')}
        sx={{
          mr: 1,
        }}
      >
        <Button
          onClick={() => {
            const nextLanguage = languages.find((language) => language !== currentLanguage)
            if (nextLanguage) {
             setLanguage(nextLanguage).catch(() => {})
            }
          }}
        >
          {currentLanguage}
        </Button>
      </Tooltip>
      {user ? (
        <>
          <Tooltip
            title={t('userMenu')}
            sx={{
              ml: 1,
            }}
          >
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
              <Avatar
                name={`${user.firstName} ${user.lastName}`}
              />
              <Typography
                sx={{
                  display: isSmallScreen ? 'none' : 'block',
                  ml: 1,
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {user.firstName}
              </Typography>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            sx={{ mt: '45px' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link to={setting.link} key={setting.link}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{t(setting.title)}</Typography>
                </MenuItem>
              </Link>
            ))}

            <MenuItem
              onClick={() => {
                handleCloseUserMenu()
                signOut()
                navigate('/')
              }}
            >
              <Typography textAlign="center">{t('logout')}</Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link to="/login">
          <Button>{t('login')}</Button>
        </Link>
      )}
    </>
  )
}

export default UserMenu
