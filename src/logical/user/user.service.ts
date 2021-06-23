import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(username: string): string {
    if (username === 'id') {
      return 'yes';
    }
    return 'no';
  }
}
