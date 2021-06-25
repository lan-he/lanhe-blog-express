import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): string {
    if (username === 'hmx') {
      return 'yes';
    }
    return 'no';
  }
}
