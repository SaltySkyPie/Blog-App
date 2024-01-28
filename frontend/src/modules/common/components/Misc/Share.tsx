import { Box } from '@mui/material'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'
import ShareSystem from './ShareSystem'

const buttons = [
  {
    title: 'Facebook',
    component: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    title: 'LinkedIn',
    component: LinkedinShareButton,
    icon: LinkedinIcon,
  },
  {
    title: 'Reddit',
    component: RedditShareButton,
    icon: RedditIcon,
  },
  {
    title: 'Twitter',
    component: TwitterShareButton,
    icon: XIcon,
  },
  {
    title: 'WhatsApp',
    component: WhatsappShareButton,
    icon: WhatsappIcon,
  },
  {
    title: 'Other',
    component: ShareSystem,
  },
]

export default function Share({ url }: { url: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {buttons.map(({ title, component: Component, icon: Icon }) => (
        <Box sx={{ mx: 0.5 }} key={title}>
          <Component url={url}>{Icon && <Icon size={32} round />}</Component>
        </Box>
      ))}
    </Box>
  )
}
