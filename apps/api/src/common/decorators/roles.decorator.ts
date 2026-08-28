import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type AppRole =
  | 'CUSTOMER'
  | 'ADMIN'
  | 'MARKETING'
  | 'OPERATION'
  | 'FINANCE'
  | 'MANAGEMENT'
  | 'DRIVER'
  | 'POOL_KEEPER';

export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
