import Container from '@mui/material/Container'

export function PageLayout(props: React.PropsWithChildren) {
  const { children } = props
  return (
    <main>
      <Container maxWidth="xl">{children}</Container>
    </main>
  )
}
