import { createSlice } from '@reduxjs/toolkit';

const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    winner: '',
    totalVotes: 0,
    candidates: [],
  },
  reducers: {
    declareResults: (state, action) => {
      state.winner = action.payload.winner;
      state.totalVotes = action.payload.totalVotes;
      state.candidates = action.payload.candidates;
    },
    updateVoteCount: (state, action) => {
      const { candidateId, voteCount } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate) {
        candidate.voteCount = voteCount;
      }
    },
  },
});

export const { declareResults, updateVoteCount } = resultsSlice.actions;
export default resultsSlice.reducer;
