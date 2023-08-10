import { ObjectLiteral, Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const repositoryMockFactory: <T extends ObjectLiteral>() => MockType<
  Repository<T>
> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  findAndCount: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
}));
