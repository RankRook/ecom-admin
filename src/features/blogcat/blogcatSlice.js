import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogcatService from "./blogcatService";


const initialState = {
  blogcats: [],
  createdBlogcat:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBlogcats = createAsyncThunk(
  "blogcat/get-blogcats",
  async (thunkAPI) => {
    try {
      return await blogcatService.getBlogcats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogcats = createAsyncThunk(
  "blogcat/create-blogcats",
  async (data, thunkAPI) => {
    try {
      return await blogcatService.createBlogcat(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogcatSlice = createSlice({
  name: "blogcats",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogcats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogcats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogcats = action.payload
      })
      .addCase(getBlogcats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createBlogcats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogcats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogcat = action.payload
      })
      .addCase(createBlogcats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      });
  },
});

export default blogcatSlice.reducer;
