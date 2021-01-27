import { gql, useMutation,  } from '@apollo/client';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';

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
            }
        }
    );

    const onSubmitValue = (e) => {
        e.preventDefault();
        addTodo({ variables: todo });
        props.history.push("/")
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
                <Button type="submit">Add Todo</Button>
            </form>
        </div>
    );
}

export default AddTodo;
