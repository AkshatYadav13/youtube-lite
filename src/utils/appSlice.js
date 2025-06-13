import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    open: false,
    videos: [],
    category: "All",
    searchSuggestion: [],
    theme:'light',
    singleVideo:[],
    islive:false
  },
  reducers: {
    toggleSideBar: (state) => {
      state.open = !state.open;
    },
    setHomeVideo: (state, action) => {
      state.videos = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchSuggestion: (state, action) => {
      state.searchSuggestion = action.payload;
    },
    toggleTheme: (state)=>{
      state.theme = state.theme === 'light' ? 'dark' :'light'
    },
    setSingleVideo: (state,action)=>{
      state.singleVideo = action.payload
    },
    setIslive:(state,action)=>{
      state.islive = action.payload
    }
  },
});

export const {setIslive,setSingleVideo, toggleSideBar, setHomeVideo, setCategory,setSearchSuggestion,toggleTheme } = appSlice.actions;
export default appSlice.reducer;
