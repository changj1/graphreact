import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_TODO = gql`
  mutation AddTodo($username: String! $body: String!) {
    createTodo(username: $username body: $body) {
        username
        body
    }
  }
`;

function AddTodo() {
    const [addTodo, { data }] = useMutation(ADD_TODO);
    const [todo, setTodo] = useState({username:'', body:''})

    const onSubmitValue = (e) => {
        e.preventDefault();
        addTodo({ variables: todo });
    }

    const onChangeValue = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form
                onSubmit={onSubmitValue}
            >
                <label id="username">Username</label>
                <input name="username" onChange={onChangeValue}  />
                <br/>
                <label id="body">body</label>
                <input name="body" onChange={onChangeValue} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}

export default AddTodo;
