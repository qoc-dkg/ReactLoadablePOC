import {connect} from 'react-redux'
import React from 'react'
import {login} from 'common/actions/session'

class Gateway extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }
  handleUserNameChange = event => {
    this.setState({
      username: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.state.error !== '' &&
            <p>{this.state.error}</p>
        }
        <div>
          <label>
            <strong>Username</strong>
          </label><br />
          <input type="text"
            required
            value={this.state.username}
            onChange={this.handleUserNameChange}/>
        </div>
        <div>
          <label>
            <strong>Password</strong>
          </label><br />
          <input type="password"
            required
            value={this.state.password}
            onChange={this.handlePasswordChange}/>
        </div>
        <button>Login</button>
      </form>
    )
  }
}

const mapStateToProps = ({session}) => ({error: session.sessionError})
export default connect(mapStateToProps, {login})(Gateway)
