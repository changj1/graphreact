import { gql, useMutation, } from '@apollo/client';
import { Button, Icon, Form, } from 'semantic-ui-react';

const DELETE_TODO = gql`
  mutation deleteTodo($todoId: ID!){
      deleteTodo(todoId:$todoId)
  }
`;

function DeleteTodo(props) {

    let todoId = props.todoId

    const [deleteTodo] = useMutation(DELETE_TODO, {
        update(cache) {
            cache.modify({
                fields: {
                    getTodos(existingTodos = []) { }
                }
            })
        },
        variables: { todoId }
    });

    const onSubmitValue = (e) => {
        console.log('delete');
        e.preventDefault()
        deleteTodo()
    }

    return (
        <Form onSubmit={onSubmitValue}>
            <Button style={{ marginLeft: 50 }} type="submit" >
                <Icon name="trash alternate outline" />
            </Button>
        </Form>
    );

}

export default DeleteTodo;
