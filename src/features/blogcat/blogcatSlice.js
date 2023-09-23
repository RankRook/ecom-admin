import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogcatService from "./blogcatService";

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

export const deleteBlogcat = createAsyncThunk(
  "blogcat/delete-blogcat",
  async(id, thunkAPI)=>{
    try{
      return await blogcatService.deleteBlogcat(id)
    }catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction("Reset_all");

const initialState = {
  blogcats: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

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
        state.isError = false;
        state.blogcats = action.payload;
      })
      .addCase(getBlogcats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogcats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogcats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogcat = action.payload;
      })
      .addCase(createBlogcats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogcat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogcat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogcat = action.payload;
      })
      .addCase(deleteBlogcat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogcatSlice.reducer;
