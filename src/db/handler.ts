import ApplicationService from '@/db/services/application';
import AuthorizationCodeService from '@/db/services/authorizationCode';
import UserService from '@/db/services/user';
import UserApplicationService from '@/db/services/userApplication';

export const applicationService = new ApplicationService();
export const userApplicationService = new UserApplicationService();
export const userService = new UserService();
export const authorizationCodeService = new AuthorizationCodeService();
