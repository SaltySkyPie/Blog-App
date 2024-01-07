import { Button, styled } from '@mui/material'
import Box from '@mui/material/Box'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { StyledLink as Link } from '../../../Misc/Link.styled'
import { pages } from '../pages'
import Logo from './Logo'
import MobileNavMenu from './MobileMenu'
import UserMenu from './UserMenu'

export const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
`

export const BigScreenBox = () => {
  const navigate = useNavigate()
  return (
    <FlexBox
      sx={{
        width: '100%',
      }}
    >
      <FlexBox sx={{ width: '90%' }}>
        <Box
          sx={{ mr: 1, cursor: 'pointer' }}
          onClick={() => {
            navigate('/')
          }}
        >
          <Logo />
        </Box>
        <FlexBox>
          {pages.map((page) => (
            <Link to={page.link} key={page.link}>
              <Button variant="text">{t(page.title)}</Button>
            </Link>
          ))}
        </FlexBox>
      </FlexBox>
      <FlexBox
        sx={{
          width: '10%',
          justifyContent: 'flex-end',
        }}
      >
        <UserMenu isSmallScreen={false} />
      </FlexBox>
    </FlexBox>
  )
}

export const SmallScreenBox = () => {
  const navigate = useNavigate()
  return (
    <FlexBox
      sx={{
        width: '100%',
      }}
    >
      <FlexBox sx={{ width: '10%', justifyContent: 'flex-start' }}>
        <MobileNavMenu />
      </FlexBox>
      <FlexBox
        sx={{
          width: '80%',
          justifyContent: 'center',
        }}
        onClick={() => {
          navigate('/')
        }}
      >
        <Logo />
      </FlexBox>
      <FlexBox
        sx={{
          width: '10%',
          justifyContent: 'flex-end',
        }}
      >
        <UserMenu isSmallScreen={true} />
      </FlexBox>
    </FlexBox>
  )
}
