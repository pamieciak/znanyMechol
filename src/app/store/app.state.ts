import { AuthState } from './auth';
import { UserState } from './is-admin/is-admin.state';
import { SpecialistListState } from './specialist-list/specialist-list.state';
import { UserListState } from './user-list/user-list.state';

export interface AppState {
  auth: AuthState;
  isAdmin: UserState;
  users: UserListState;
  specialists: SpecialistListState;
}
