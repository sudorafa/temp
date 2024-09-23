import axios from 'axios';
import TodoListService from './TodoListService';
import testData from './test-data/todo-list-stub.json'

jest.mock('axios');

describe('TodoListService', () => {
  let service;
  let mockedAxios;

  beforeEach(() => {
    mockedAxios = axios;
    service = new TodoListService(mockedAxios);
  });

  it('deve criar uma nova lista', async () => {
    const todoData = { name: 'Fazer compras', completed: false };
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1, ...todoData } });

    const createdTodo = await service.createTodo(todoData);

    expect(createdTodo).toEqual({ id: 1, ...todoData });
    expect(mockedAxios.post).toHaveBeenCalledWith('/todos', todoData);
  });
  
  it('deve retornar todas as listas', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: testData });
    
    const todoLists = await service.getAll();
    expect(todoLists).toEqual(testData);
  });
  
  it('deve retornar uma lista baseada na id se existente', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [testData[0]] });
    const searchId = 1
    const filteredList = testData.filter(todoList => todoList.id === searchId) 
    
    const todoLists = await service.getTodoById(searchId);
    expect(todoLists).toEqual(filteredList);
    expect(mockedAxios.get).toHaveBeenCalledWith(`/todos/${searchId}`);
  });
  
  it('deve atualizar uma lista', async () => {
    const todoId = 1;
    const updatedTodoData = { name: 'Novo título' };
    mockedAxios.put.mockResolvedValueOnce({ data: { ...updatedTodoData, id: todoId } });

    const updatedTodo = await service.updateTodo(todoId, updatedTodoData);

    expect(updatedTodo).toEqual({ ...updatedTodoData, id: todoId });
    expect(mockedAxios.put).toHaveBeenCalledWith(`/todos/${todoId}`, updatedTodoData);
  });

  it('deve apagar uma lista', async () => {
    const todoId = '123';
    mockedAxios.delete.mockResolvedValueOnce({});

    await service.deleteTodo(todoId);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`/todos/${todoId}`);
  });
});