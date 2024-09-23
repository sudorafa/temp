class TodoListService {
  httpClient;
  constructor(httpClient){
    this.httpClient = httpClient;
  }

  // Método para criar um novo todo
  async createTodo(todoData) {
    console.log(`TodoListService.name: createTodo`, todoData)
    try {
      const response = await this.httpClient.post('/todos', todoData);
      return response.data;
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao criar todo:', error);
      throw error;
    }
  }

  // Método para obter todos os todos
  async getAll() {
    try {
      const response = await this.httpClient.get('/todos');
      return response.data;
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao obter todos os todos:', error);
      throw error;
    }
  }

  // Método para obter um todo específico
  // todoId - string
  async getTodoById(todoId) {
    try {
      const response = await this.httpClient.get(`/todos/${todoId}`);
      return response.data;
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao obter todo:', error);
      throw error;
    }
  }
  
  // Método para atualizar um todo
  async updateTodo(todoId, updatedTodoData) {
    console.log(`TodoListService.name: updateTodo`, todoId, updatedTodoData)
    try {
      const response = await this.httpClient.put(`/todos/${todoId}`, updatedTodoData);
      return response.data;
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao atualizar todo:', error);
      throw error;
    }
  }

  // Método para deletar um todo
  async deleteTodo(todoId) {
    try {
      await this.httpClient.delete(`/todos/${todoId}`);
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao deletar todo:', error);
      throw error;
    }
  }
}

export default TodoListService;