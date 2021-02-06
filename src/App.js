// import logo from './logo.svg';
import './App.css';
import { client } from "./client";
import { ApolloProvider } from '@apollo/client';
import AddTodo from './components/AddTodo';

import GetTodos from './components/GetTodos';
import { BrowserRouter, Route } from 'react-router-dom'
import UpdateTodo from './components/UpdateTodo';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Navbar from './components/Navbar';
import Login from './components/Login';


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter style={{ marginLeft: 50 }}>
        <Container>
          <h2>My first Apollo app</h2>
          <Navbar/>
          <Route exact path="/" component={GetTodos} />
          <Route exact path="/add" component ={AddTodo} />
          <Route exact path="/login" component ={Login} />
          <Route exact path="/todos/:todoId" component={UpdateTodo} />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
