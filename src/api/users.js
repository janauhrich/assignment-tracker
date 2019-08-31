import request from './request'

export const fetchUsers = () => request('/api/users')

export const fetchAssignments = () => request('/api/users/assignments')

export const fetchGradedAssignments = () => request('/api/users/assignments?graded')

export const fetchUngradedAssignments = () => request('/api/users/assignments?ungraded')

