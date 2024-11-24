import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'public';
export const IS_REFRESH_KEY = 'refresh';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Refresh = () => SetMetadata(IS_REFRESH_KEY, true);
