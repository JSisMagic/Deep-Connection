import { useState, useEffect, useContext } from 'react';
import {
  Stack,
  SimpleGrid,
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Checkbox,
  Icon,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { AuthContext } from '../../context/AuthContext';
import { createTodoForUser, getTodosForUser, updateTodoForUser, deleteTodoForUser } from '../../services/todos.services';

const TodoComponent = () => {
  const { user } = useContext(AuthContext)
  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const todos = await getTodosForUser(user.uid);
    setTodos(todos);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (newTodo) {
      await createTodoForUser(user.uid, { text: newTodo, completed: false });
      setNewTodo('');
      await fetchTodos();
    }
  };

  const toggleTodo = async (todoId, completed) => {
    await updateTodoForUser(user.uid, todoId, { ...todos[todoId], completed: !completed });
    await fetchTodos();
  };

  const removeTodo = async (todoId) => {
    await deleteTodoForUser(user.uid, todoId);
    await fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Stack
    marginTop={5}
    p={4}
    bg="gray.50"
    borderRadius="md"
    overflowY="auto"
    maxHeight="100vh"
  >
    <form onSubmit={addTodo}> 
      <InputGroup>
        <Input
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <InputRightElement>
          <Icon as={AddIcon} color="gray.500" onClick={addTodo} cursor="pointer"/>
        </InputRightElement>
      </InputGroup>
    </form>
    <SimpleGrid columns={1} spacing={3} marginTop={3}>
      {Object.entries(todos).length ? (
        Object.entries(todos).map(([todoId, todo]) => (
          <Flex
            key={todoId}
            background="white"
            p={3}
            borderRadius="md"
            justify="space-between"
            align="center"
            boxShadow="base"
          >
            <Flex gap={3}>
            <Checkbox
                  isChecked={todo.completed}
                  onChange={() => toggleTodo(todoId, todo.completed)}
                  size="md"
                  colorScheme="blackAlpha"
                  sx={{
                    '.chakra-checkbox__control': {
                      borderColor: 'black',
                      _checked: {
                        bg: 'black',
                        borderColor: 'black',
                        color: 'white',
                      },
                      _invalid: {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              <Box>
                <Text>{todo.text}</Text>
              </Box>
            </Flex>
            <Button
              bgColor="#E9D8FD"
              fontWeight={600}
              size="sm"
              onClick={() => removeTodo(todoId)}
            >
              Delete
            </Button>
          </Flex>
        ))
      ) : (
        <Heading textAlign="center" marginTop={5}>
          No todos found
        </Heading>
      )}
    </SimpleGrid>
  </Stack>
  );
};

export default TodoComponent;