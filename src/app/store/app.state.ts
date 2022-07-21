import { AdminUserState } from './admin-user/admin-user.state';
import { AuthState } from './auth';
import { SearchState } from './search/search.state';
import { SpecialistListState } from './specialist-list/specialist-list.state';
import { UserListState } from './user-list/user-list.state';
import { AppUserState } from './user/user.state';

export interface AppState {
  auth: AuthState;
  isAdminLoggedIn: AdminUserState;
  users: UserListState;
  specialists: SpecialistListState;
  search: SearchState;
  appUser: AppUserState;
}
