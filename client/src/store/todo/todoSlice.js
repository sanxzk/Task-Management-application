import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  taskList: [],
  isLoading: false,
  showAddModal: false,
  showEditModal: null,
  showDesc: null,
};

export const fetchTasks = createAsyncThunk(
  "todo/fetchTasks",
  async (authToken, thunkAPI) => {
    try {
      const response = await todoService.fetchTasks(authToken);
      if (response.success) return response;
      else {
        throw new Error(response.error.error);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const markAsComplete = createAsyncThunk(
  "todo/markAsComplete",
  async ({ todoId, authToken }, thunkAPI) => {
    try {
      console.log(todoId, authToken);
      const response = await todoService.markAsComplete({
        todoId,
        authToken,
      });
      if (response.success) return response;
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createNewTask = createAsyncThunk(
  "todo/createNewTask",
  async ({ authToken, newTask }, thunkAPI) => {
    try {
      console.log("test ", authToken, newTask);
      const response = await todoService.addNewTask({
        authToken,
        newTask,
      });
      if (response.success) return response;
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const editTask = createAsyncThunk(
  "todo/editTask",
  async ({ authToken, editedTask, todoId }, thunkAPI) => {
    try {
      // console.log("test ", authToken, newTask);
      const response = await todoService.editTask({
        authToken,
        editedTask,
        todoId,
      });
      if (response.success) return response;
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async ({ authToken, todoId }, thunkAPI) => {
    try {
      const response = await todoService.deleteTask({
        authToken,
        todoId,
      });
      if (response.success) return response;
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.showAddModal = true;
    },
    closeAddModal: (state) => {
      state.showAddModal = false;
    },
    openEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    closeEditModal: (state) => {
      state.showEditModal = null;
    },
    openDescModal: (state, action) => {
      state.showDesc = action.payload;
    },
    closeDescModal: (state) => {
      state.showDesc = null;
    },
    sortByPriority: (state) => {
      let sortedList = [...state.taskList].sort(
        (a, b) => a.priority - b.priority
      );
      state.taskList = sortedList;
    },
    sortByDueDate: (state) => {
      let sortedList = [...state.taskList].sort(
        (a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return dateA - dateB;
        }
      );
      state.taskList = sortedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.taskList = [];
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.taskList = action.payload.TodoList;
          state.isLoading = false;
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.taskList = [];
        state.isLoading = false;
      })
      .addCase(markAsComplete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAsComplete.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(markAsComplete.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDescModal,
  closeDescModal,
  sortByPriority,
  sortByDueDate
} = todoSlice.actions;
export default todoSlice.reducer;
