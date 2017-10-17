import {connect} from 'react-redux'
import React from 'react'
import {logout} from 'common/actions/session'

class Dashboard extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.logout()
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button>logout</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, {logout})(Dashboard)
