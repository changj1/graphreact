import { gql, useMutation,  } from '@apollo/client';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

const ADD_TODO = gql`
  mutation AddTodo($username: String! $body: String!) {
    createTodo(username: $username body: $body) {
        username
        body
    }
  }
`;

// const GET_TODOS = gql`
//     query getTodos{
//         getTodos{
//             id
//             username
//             body
//             createdAt 
//         } 
//     }
// `

function AddTodo(props) {
    const [todo, setTodo] = useState({username:'', body:''})
    const [addTodo] = useMutation(ADD_TODO,
        {
            update(cache, ){
                cache.modify({
                    fields:{
                        getTodos(existingTodos=[]){
                            console.log(existingTodos);
                        }
                    }
                })
            },
            variables: todo

        }
    );

    const onSubmitValue = (e) => {
        e.preventDefault();
        addTodo();
        props.history.push("/")
    }

    const onChangeValue = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value})
    }

    return (

        <div>
            <Form onSubmit={onSubmitValue}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="username"
                        name="username"
                        onChange={onChangeValue}
                        value={todo.username}
                        // error={error ? true : false}
                    />
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChangeValue}
                        value={todo.body}
                        // error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
        </div>
    );
}

export default AddTodo;
