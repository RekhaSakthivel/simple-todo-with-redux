import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const {data, error} = await supabase.from("todos").select("*").order("id", {ascending:false});
    if(error) throw error;
    return data;
})

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (title) => {
    const {data, error} = await supabase.from("todos").insert({title}).select("*").single();
    if(error) throw error;
    return data;
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodos', async (todo) => {
    console.log("hello");
    const {data, error} = await supabase.from("todos").update({is_complete : !todo.is_complete})
    .eq("id", todo.id).select("*").single();
    console.log(data);
    if(error) throw error;
    return data;
})

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) => {
    const {data, error} = await supabase.from("todos").delete().eq('id', id);
    if(error) throw error;
    return id;
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {state.items = action.payload;})
        .addCase(addTodoAsync.fulfilled, (state, action) => {state.items.unshift(action.payload)})
        .addCase(toggleTodoAsync.fulfilled, (state, action) => {
            const idx = state.items.findIndex(t => t.id === action.payload.id);
            if(idx > -1) state.items[idx]=action.payload;
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            state.items = state.items.filter(t => t.id !==action.payload)
        })
        .addMatcher(
            action => action.type.endsWith('/pending'),
            state => { state.status = 'loading'; state.error = null;}
        )
        .addMatcher(
            action => action.type.endsWith('/fulfilled'),
            state => { state.status = 'succeeded';}
        )
        .addMatcher(
            action => action.type.endsWith('/rejected'),
            (state, action) => { state.status = 'failed'; state.error = action.error.message;}
        )


    }
});

export default todosSlice.reducer;