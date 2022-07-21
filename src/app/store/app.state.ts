import { AuthState } from './auth';
import { AdminUserState } from './is-admin/is-admin.state';
import { SearchState } from './search/search.state';
import { SpecialistListState } from './specialist-list/specialist-list.state';
import { UserListState } from './user-list/user-list.state';
import { appUserState } from './user/user.state';

export interface AppState {
  auth: AuthState;
  isAdminLoggedIn: AdminUserState;
  users: UserListState;
  specialists: SpecialistListState;
  search: SearchState;
  appUser: appUserState;
}
