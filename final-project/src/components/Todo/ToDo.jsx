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
  useToast
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { AuthContext } from '../../context/AuthContext';
import { createTodoForUser, getTodosForUser, updateTodoForUser, deleteTodoForUser } from '../../services/todos.services';

const TodoComponent = () => {
  const { user } = useContext(AuthContext)
  const toast = useToast();
  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const todos = await getTodosForUser(user.uid);
    setTodos(todos);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      if (newTodo) {
        await createTodoForUser(user.uid, { text: newTodo, completed: false });
        setNewTodo('');
        await fetchTodos();
  
        toast({
          title: "Todo Added",
          description: `You have successfully added a new todo: "${newTodo}".`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "No Todo Entered",
          description: "Please enter a todo before trying to add it.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while adding the todo: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleTodo = async (todoId, completed) => {
    await updateTodoForUser(user.uid, todoId, { ...todos[todoId], completed: !completed });
    await fetchTodos();
  };

  const removeTodo = async (todoId) => {
    try {
      await deleteTodoForUser(user.uid, todoId);
      await fetchTodos();
  
      toast({
        title: "Todo Removed",
        description: "You have successfully removed a todo.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while removing the todo: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
    h="100%"
  >
    <form onSubmit={addTodo}> 
      <InputGroup>
        <Input
          placeholder="Add new task"
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
