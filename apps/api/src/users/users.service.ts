import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  // Test Data
  private readonly users = [
    {
      userId: 1,
      username: 'dancute',
      password: 'password',
    },
    {
      userId: 2,
      username: 'abubadan',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
