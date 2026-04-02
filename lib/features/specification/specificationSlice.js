import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSpecifications = createAsyncThunk(
    'specification/fetchSpecifications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/specification')
            if (!response.ok) {
                return rejectWithValue('Error fetching specifications')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createSpecification = createAsyncThunk(
    'specification/createSpecification',
    async (specData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/specification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(specData),
            })
            if (!response.ok) {
                return rejectWithValue('Error creating specification')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateSpecification = createAsyncThunk(
    'specification/updateSpecification',
    async ({ id, ...specData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/specification/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(specData),
            })
            if (!response.ok) {
                return rejectWithValue('Error updating specification')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteSpecification = createAsyncThunk(
    'specification/deleteSpecification',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/specification/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                return rejectWithValue('Error deleting specification')
            }
            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    list: [],
    loading: false,
    error: null,
}

const specificationSlice = createSlice({
    name: 'specification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecifications.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSpecifications.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchSpecifications.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createSpecification.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            .addCase(updateSpecification.fulfilled, (state, action) => {
                const index = state.list.findIndex(item => item.id === action.payload.id)
                if (index !== -1) {
                    state.list[index] = action.payload
                }
            })
            .addCase(deleteSpecification.fulfilled, (state, action) => {
                state.list = state.list.filter(item => item.id !== action.payload)
            })
    },
})

export default specificationSlice.reducer
