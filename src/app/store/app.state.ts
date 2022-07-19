import { AuthState } from './auth';
import { UserState } from './is-admin/is-admin.state';

export interface AppState {
  auth: AuthState;
  isAdmin: UserState;
}
