import { AuthState } from './auth';
import { isAdminState } from './isAdmin/isAdmin.state';

export interface AppState {
  auth: AuthState;
  isAdmin: isAdminState;
}
