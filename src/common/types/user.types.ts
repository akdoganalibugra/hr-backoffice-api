import { User } from '@prisma/client';

// Common user types
export type UserResponse = Omit<User, 'password'>;
export type UserPreview = Pick<User, 'id' | 'firstName' | 'lastName'>;
export type UserEdit = Omit<User, 'id' | 'password'>;
