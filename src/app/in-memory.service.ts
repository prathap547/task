import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryService implements InMemoryDbService {
  createDb() {
    const todoData = [
      {id: 1, todo: 'Todo-List-1', date: new Date()},
      {id: 2, todo: 'Todo-List-2', date: new Date()},
      {id: 3, todo: 'Todo-List-3', date: new Date()},
    ];
    return { todoData };
  }
}