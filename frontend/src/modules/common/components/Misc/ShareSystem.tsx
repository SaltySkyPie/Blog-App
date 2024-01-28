import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/material/Box'

const ShareButton = () => {
  const handleShare = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => {
          console.log('Thanks for sharing!')
        })
        .catch(console.error)
    } else {
      // Fallback for browsers that do not support the Web Share API
      console.log('Web Share not supported on this browser')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!navigator.share) return null

  return (
    <Box
      onClick={handleShare}
      aria-label="share"
      color="primary"
      sx={{
        p: 0,
        cursor: 'pointer',
      }}
    >
      <ShareIcon />
    </Box>
  )
}

export default ShareButton
