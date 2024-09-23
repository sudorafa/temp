### Estimativa de Horas

1. **Planejamento e Design (5-8 horas)**
   - Definir a estrutura do projeto.
   - Criar wireframes ou protótipos para as telas.

2. **Configuração do Ambiente (2-3 horas)**
   - Configurar o projeto React.
   - Instalar dependências necessárias.

3. **Desenvolvimento da Tela Inicial (5-7 horas)**
   - Implementar a tela inicial com instruções e o menu.

4. **Implementação da Funcionalidade "Criar TO DO" (6-8 horas)**
   - Criar a lógica para a geração de URLs e redirecionamento.

5. **Implementação da Funcionalidade "Editar TO DO" (10-12 horas)**
   - Criar, editar, excluir itens e organizar sub-itens.

6. **Implementação da Funcionalidade "Excluir TO DO" (3-5 horas)**
   - Lógica para o usuário excluir suas listas.

7. **Implementação da Funcionalidade "Compartilhar TO DO" (3-5 horas)**
   - Integrar sistema de compartilhamento por e-mail.

8. **Simulação das Chamadas REST (5-8 horas)**
   - Implementar a lógica de simulação e tratamento de retornos.

9. **Testes e Depuração (5-8 horas)**
   - Testar funcionalidades e corrigir bugs.

10. **Documentação e Finalizações (3-5 horas)**
    - Documentar o código e criar instruções de uso.

### Total Estimado: 43 a 61 horas

___________________________________________

### Escolhas de arquitetura:

 - Front-end stack: 
    - React
    - Chakra UI para componentes
    - @tanstack/react-query para gerenciar dados vindo da API
    - axios para fazer os requests
    - react-router para roteamento
    
  - Simulação de back-end
    -  json-server
    
    
___________________________________________

### Para rodar o projeto localmente

1. Primeiro clone o projeto:
```git clone git@git.vibbra.com.br:kae/todo-vibbra.git```

2. Instale as dependências do projeto

```npm install``` 

3. Rode o projeto:

```npm run start```