import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import * as React from 'react'

import { User } from 'interfaces/Props'

interface AvatarMenuProps {
  readonly user?: User
  readonly onSignOut?: () => any
}

interface AvatarMenuState {
  anchorEl: object
}

export class AvatarMenu extends React.Component<AvatarMenuProps, AvatarMenuState> {
  state: { anchorEl: any } = {
    anchorEl: null,
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ anchorEl: null })
  }

  handleSignOut = () => {
    this.props.onSignOut()
  }

  render() {
    const open = Boolean(this.state.anchorEl)
    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <Avatar className="avatar" src={this.props.user.profile.avatar} />
        </IconButton>
        <Menu className="avatar-menu" open={open} anchorEl={this.state.anchorEl} onClose={this.handleRequestClose}>
          <MenuItem className="avatar-menu-email" onClick={this.handleRequestClose}>
            {this.props.user.profile.email}
          </MenuItem>
          <MenuItem className="avatar-menu-email" onClick={this.handleRequestClose}>
            Your Profile
          </MenuItem>
          <MenuItem className="avatar-menu-email" onClick={this.handleRequestClose}>
            Settings
          </MenuItem>
          <MenuItem className="avatar-menu-sign-out" onClick={this.handleSignOut}>
            Log Out
          </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}
