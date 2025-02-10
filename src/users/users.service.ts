import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Intern' },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Admin',
    },
    {
      id: 3,
      name: 'Mike Brown',
      email: 'mike.brown@example.com',
      role: 'Engineer',
    },
    { id: 4, name: 'Sara Lee', email: 'sara.lee@example.com', role: 'Intern' },
    {
      id: 5,
      name: 'Chris Green',
      email: 'chris.green@example.com',
      role: 'Admin',
    },
    {
      id: 6,
      name: 'Emma White',
      email: 'emma.white@example.com',
      role: 'Engineer',
    },
    {
      id: 7,
      name: 'Paul Black',
      email: 'paul.black@example.com',
      role: 'Intern',
    },
    { id: 8, name: 'Nina Gray', email: 'nina.gray@example.com', role: 'Admin' },
  ];

  findAll(role?: 'Intern' | 'Engineer' | 'Admin') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
