import {createSlice} from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name:'chat',
    initialState:{
        message:[],
    },
    reducers:{
        setMessage:(state,action)=>{
            state.message.push(...action.payload)
            if (state.message.length > 40) {
                state.message.splice(0,40)
            }
        }
    }
})

export const {setMessage} = chatSlice.actions
export default chatSlice.reducer