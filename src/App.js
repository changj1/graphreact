// import logo from './logo.svg';
import './App.css';
import { client } from "./client";
import { ApolloProvider } from '@apollo/client';
import AddTodo from './components/AddTodo';

import GetTodos from './components/GetTodos';
import { BrowserRouter, Route } from 'react-router-dom'
import UpdateTodo from './components/UpdateTodo';


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter style={{ marginLeft: 50 }}>
        <h2>My first Apollo app</h2>
        <Route exact path="/" component={GetTodos} />
        <Route exact path="/add" component ={AddTodo} />
        <Route exact path="/todos/:todoId" component={UpdateTodo} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
