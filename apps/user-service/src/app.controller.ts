import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface UserRequest {
  id: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

@Controller()
export class AppController {
  @GrpcMethod('UserService', 'GetUser')
  getUser(data: UserRequest): UserResponse {
    return {
      id: data.id,
      name: `User ${data.id}`,
      email: `user${data.id}@example.com`,
    };
  }
}
