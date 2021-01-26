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
    // const { loading, error, data } = useQuery(GET_TODOS);
    const [todo, setTodo] = useState({username:'', body:''})
    const [addTodo] = useMutation(ADD_TODO,
        {
            update(cache, {data: { createTodo }}){
                cache.modify({
                    fields:{
                        getTodos(existingTodos=[]){
                            console.log(existingTodos);
                        }
                    }
                })
                
                // cache.modify({
                //     fields:{
                //         getTodos(existingTodos = []){
                //             const newTodoRef = cache.writeFragment({
                //                 data: createTodo,
                //                 fragment: gql`
                //                     fragment NewgetTodos on Todo {
                //                         body
                //                         username
                //                     }
                //                 `
                //             })
                //             console.log('this',newTodoRef);
                //             return [...existingTodos, newTodoRef]
                //         }
                //     }
                // })
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
