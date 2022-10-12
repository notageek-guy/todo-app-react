import { Heading } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";

function App() {
  const initialTodos = [
    {
      id: 1,
      body: "get bread",
      completed: false,
    },
    {
      id: 2,
      body: "get butter",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  const { colorMode, toggleColorMode } = useColorMode();
  const toggleDone = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading
        mb="8"
        fontWeight={["bold", "extrabold"]}
        fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
        bgGradient="linear(to-l, #7928CA, #FF0080, #FF0080, #7928CA)"
        bgClip="text"
      >
        Todo App
      </Heading>
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleDone={toggleDone} />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
}

export default App;
