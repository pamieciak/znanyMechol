import { AuthState } from './auth';
import { isAdminState } from './is-admin/is-admin.state';

export interface AppState {
  auth: AuthState;
  isAdmin: isAdminState;
}
