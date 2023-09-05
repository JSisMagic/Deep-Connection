import { set, get, ref, update, remove } from "firebase/database"
import { db } from "../config/firebase"


export const createTodoForUser = async (uid, todo) => {
  const id = new Date().getTime().toString();
  const newTodo = { id, ...todo };

  await set(ref(db, `users/${uid}/todos/${id}`), newTodo);
  return { ...newTodo };
};

export const getTodosForUser = async (uid) => {
  const todosRef = ref(db, `users/${uid}/todos`);
  const snapshot = await get(todosRef);
  return snapshot.val() || {};
};

export const updateTodoForUser = async (uid, todoId, todo) => {
  await update(ref(db, `users/${uid}/todos/${todoId}`), todo);
  return { ...todo };
};

export const deleteTodoForUser = async (uid, todoId) => {
  await remove(ref(db, `users/${uid}/todos/${todoId}`));
};