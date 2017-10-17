import {
  SESSION_START,
  SESSION_END,
  SESSION_START_FAILED
} from 'common/actions/types'

const INITIAL_STATE = {
  checkingSession: true,
  hasSession: false,
  sessionError: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_START:
      return {
        checkingSession: false,
        hasSession: true,
        sessionError: ''
      }
    case SESSION_END:
      return {
        checkingSession: false,
        hasSession: false,
        sessionError: ''
      }
    case SESSION_START_FAILED:
      return {
        checkingSession: false,
        hasSession: false,
        sessionError: action.payload
      }
  }
  return state
}
