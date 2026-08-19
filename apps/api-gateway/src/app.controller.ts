import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  UseGuards,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Observable } from 'rxjs';

interface UserRequest {
  id: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

interface UserService {
  getUser(data: UserRequest): Observable<UserResponse>;
}

@Controller()
@UseGuards(ThrottlerGuard)
export class AppController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get('users/:id')
  getUser(@Param('id') id: string): Observable<UserResponse> {
    return this.userService.getUser({ id });
  }
}
