import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Icon, Form, Input } from 'semantic-ui-react';

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: String!
    $body: String!
  ){
      updateTodo(
        todoId: $id
        body: $body
      ){
        id
        body
        createdAt
       }
  }
`;

const GET_TODO = gql`
  query getOne($todoId: ID!){
      getTodoOne(todoId:$todoId){
        username
        body
        createdAt
       }
  }
`;

function UpdateTodo(props) {

  let todoId = props.match.params.todoId
  todoId = todoId.trim()

  const { loading, error, data } = useQuery(GET_TODO, {
    variables: { todoId }
  })
  
  let username, body, createdAt =''
  let user = { username, body, createdAt }
  try {
    user = data.getTodoOne
  } catch (error) {
    console.log('waiting for loading');
  }

  const [upbody, setUpdateboby] = useState({ id: todoId, body: '' })
  const [updateTodo] = useMutation(UPDATE_TODO,{
    update(cache, {data:{updateTodo}}){
      cache.modify({
        fields:{
          getTodoOne(){
            const newTodoRef = cache.writeFragment({
              data:updateTodo,
              fragment: gql`
                fragment newTodo on Todo{
                  body
                }
              `
            }) 
            return newTodoRef
          }
        }
      })
    },
    variables: upbody
  });
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>`Error ${error.message}`</p>

  const onChangeValue = (e) => {
    setUpdateboby({ ...upbody, [e.target.name]: e.target.value })
  }

  const onSubmitValue = (e) => {
    e.preventDefault()
    updateTodo()
    console.log('obj', upbody);
  }

  return (
    <Card>
      <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Meta>
          <span className='date'>{user.createdAt}</span>
        </Card.Meta>
        <Card.Description>
          {/* {upbody.body? upbody.body:user.body } */}
          {user.body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          <Icon name='user' />
          Friend 22
      </p>
      </Card.Content>

      <Form
        onSubmit={onSubmitValue}
      >
        <Input name="body" onChange={onChangeValue} />
        <Button type="submit">Update Todo</Button>
        <Button as={Link} to={'/'}>List</Button>
      </Form>
    </Card>
  );

}

export default UpdateTodo;
