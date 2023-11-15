// skapa en function för att hämta data
// skapa en funktion för att lägga till data
// skapa en funktion för att radera data
// skapa en funktion för att updatera data
// skapaen function för att visa upp data
// skapa en eventlistener på knappar
// visa max 5 användare från start
// fånga upp felmeddelanden om servern inte svarar eller ändra fel

const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodoButton");
const todoList = document.getElementById("todoList");

const url = "https://jsonplaceholder.typicode.com/todos";

/************** ladda in data***************/
const fetchTodos = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    data.slice(0, 5).forEach((todo) => {
      addTodoToList(todo);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

/*******funktion att lägga till data *****/
const addTodo = async () => {
  const newTodo = todoInput.value;
  if (newTodo) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title: newTodo,
          userId: 1, // användar id
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add a new todo");
      }
      const data = await response.json();

      // visa den updaterade listan efler att du har lagt till en ny rad
      addTodoList(data);
      todoInput.value = ""; // rensa inputfältet
    } catch (error) {
      console.error("Error adding a new todo:", error);
    }
  }
};

/******** function för att kunna lägga in data via inputfältet**************/
const addTodoList = (todo) => {
  const li = document.createElement(`li`);
  const taskSpan = document.createElement(`span`);
  taskSpan.textContent = todo.title;

  // button för att uppdatera listan
  const updateButton = document.createElement("button");
  updateButton.textContent = "update";
  updateButton.addEventListener("click", () => {
    const updatedTitle = prompt("updated task", taskSpan.textContent);
    if (updatedTitle) {
      updateTodo(todo.id, updatedTitle, taskSpan);
    }
  });
  /**** *****/

  //button för att radera listan
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", () => {
    deleteTodo(todo.id, li);
  });
  /**** lägga till all data i ul elementet* ***/
  li.append(taskSpan);
  li.append(updateButton);
  li.append(deleteButton);
  todoList.appendChild(li);
};

const addTodoToList = (todo) => {
  const li = document.createElement("li");
  const taskSpan = document.createElement("span");
  taskSpan.textContent = todo.title;

  // Lägg till uppdatera button
  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", () => {
    const updatedTitle = prompt("Update the task:", taskSpan.textContent);
    console.log(updatedTitle);
    if (updatedTitle) {
      // uppdatera förändringar

      updateTodo(todo.id, updatedTitle, taskSpan);
    }
  });

  // lägg till en delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    // ta bort listan
    deleteTodo(todo.id, li);
  });

  li.appendChild(taskSpan);
  li.appendChild(updateButton);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
};

// function för att uppdatera listan
const updateTodo = async (todoId, updatedTitle, taskSpan) => {
  console.log("Updating todo:", todoId, updatedTitle);
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${todoId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: updatedTitle,
          completed: false, // kan användas för att kolla vilka tasks somhar gjorts
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update");
    }
    const data = await response.json();
    taskSpan.innerText = data.title;
  } catch (error) {
    console.error("Error updating the todo:", error);
  }
};

// function för att radera listan
const deleteTodo = async (todoId, listItem) => {
  console.log(todoId);
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${todoId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete the todo");
    }
    listItem.remove();
  } catch (error) {
    console.error("Error deleting a new todo:", error);
  }
};

addTodoButton.addEventListener("click", addTodo);
fetchTodos();
