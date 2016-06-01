import { 
  CHANGE_AUTH 
} from '../actions/types';

// by default our user is not logged in
export default function(state = false, action) {
  switch (action.type) {
  case CHANGE_AUTH:
    return action.payload;
  default:
    return state;
  }
}