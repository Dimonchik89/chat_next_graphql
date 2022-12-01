import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.user;

export const user = createSelector(baseState, state => state.user)