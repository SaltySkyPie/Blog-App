import { VoteType } from '@app/graphql/types'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { SvgIconProps } from '@mui/material'

export interface VoteIcon {
  active: (props: SvgIconProps) => JSX.Element
  inactive: (props: SvgIconProps) => JSX.Element
}

export interface VoteIcons {
  [key: string]: VoteIcon
}

export const VoteTypeIcons: VoteIcons = {
  [VoteType.Up]: {
    active: (props) => <ThumbUpIcon {...props} />,
    inactive: (props) => <ThumbUpOutlinedIcon {...props} />,
  },
  [VoteType.Down]: {
    active: (props) => <ThumbDownIcon {...props} />,
    inactive: (props) => <ThumbDownOutlinedIcon {...props} />,
  },
  default: {
    active: (props) => <SentimentVerySatisfiedIcon {...props} />,
    inactive: (props) => <SentimentVerySatisfiedIcon {...props} />,
  },
}
