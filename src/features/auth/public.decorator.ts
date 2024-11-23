import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = '12345678';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
