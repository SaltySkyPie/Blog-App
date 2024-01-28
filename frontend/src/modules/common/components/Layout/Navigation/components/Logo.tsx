import logo from '@app/assets/images/logo.svg'

const Logo = () => {
  return <img src={logo} alt="logo" style={
    {
      width: '75px',
      height: '75px',
      objectFit: 'contain'
    }
  } />
}

export default Logo
