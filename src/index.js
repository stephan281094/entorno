import { app } from 'hyperapp'
import { actions, initialState, view } from './app'

app(initialState, actions, view, document.body)
