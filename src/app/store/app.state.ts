import { AuthState } from './auth';
import { UserState } from './is-admin/is-admin.state';
import { isPassCorrectState } from './is-password-correct/password.state';
import { SearchState } from './search/search.state';
import { SpecialistListState } from './specialist-list/specialist-list.state';
import { UserListState } from './user-list/user-list.state';
import { singleUserState } from './user/user.state';

export interface AppState {
  auth: AuthState;
  isAdmin: UserState;
  users: UserListState;
  specialists: SpecialistListState;
  search: SearchState;
  isPasswordCorrect: isPassCorrectState;
  singleuser: singleUserState;
}
