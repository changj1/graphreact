import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
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

  // const { loading, error, data: { getTodoOne: { username, body, createdAt}} } = useQuery(GET_TODO, {
  const { loading, error, data } = useQuery(GET_TODO, {
    variables: { todoId }
  })

  // console.log('username',data.getTodoOne.username);
  let username, body, createdAt = ''
  // setTimeout(() => {
    try {
      username = data.getTodoOne.username
      body = data.getTodoOne.body
      createdAt = data.getTodoOne.createdAt
      console.log('userdata',username, body, createdAt);
      
    } catch (error) {
      console.log('waiting for loading');
    }
  // }, 1000);

  // new Promise(()=>data)
  //   .then(data ? v = data['getTodoOne'] : "not yet" )
  //   .then(data['getTodoOne']? (username = v.username):'')
    
    
  const [upbody, setUpdateboby] = useState({ id: '', body: '' })
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>
  if (error) return <p>`Error ${error.message}`</p>

  const onChangeValue = (e) => {
    setUpdateboby({ ...upbody, [e.target.name]: e.target.value, id: e.target.id })
  }

  const onSubmitValue = (e) => {
    e.preventDefault()
    const upup = updateTodo({ variables: upbody })
    console.log('obj', upbody);
    console.log('hello :', upup);
  }



  return (
    <Card>
      <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>
          <span className='date'>{createdAt}</span>
        </Card.Meta>
        <Card.Description>
          {body}
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
      </Form>
    </Card>
  );

}

export default UpdateTodo;
