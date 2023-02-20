import {
  LOAD_DATA_FINISH,
  LOAD_MORE_FINISH,
  LOAD_MORE_START,
  UPDATE_POLL_STATE,
} from './actions'

export default function PollsReducer(state, action) {
  switch (action.type) {
    case LOAD_MORE_START:
      return { ...state, btnLoading: true }
    case LOAD_MORE_FINISH:
      return {
        ...state,
        btnLoading: false,
        polls: [...state.polls, ...action.payload.data],
        hasMore: action.payload.more,
        last: action.payload.last,
      }
    case LOAD_DATA_FINISH:
      return {
        ...state,
        isLoading: false,
        polls: action.payload.data,
        hasMore: action.payload.more,
        last: action.payload.last,
      }
    case UPDATE_POLL_STATE:
      const { uid, selected, pollid } = action.payload
      const index = state.polls.findIndex((item) => item.pollid === pollid)
      const newPolls = [...state.polls]

      newPolls[index] = {
        ...newPolls[index],
        given: [...newPolls[index].given, uid],
        options: {
          ...newPolls[index].options,
          [selected]: newPolls[index].options[selected] + 1,
        },
      }

      return {
        ...state,
        polls: newPolls,
      }

    default:
      return state
  }
}
