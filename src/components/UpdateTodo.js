import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

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

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      body
    }
  }
`;

function UpdateTodo(props) {

  const todoId = props.match.params.todoId
  console.log(todoId);
  
  
  const { loading, error, data } = useQuery(GET_TODOS)
  // data.getTodos.map(v => {
  //   console.log('what: ',v.id);
  //   return v.id
  // }) 
  console.log('what',data);
  const [upbody, setUpdateboby] = useState({id:'', body:''})
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>
  if (error) return <p>`Error ${error.message}`</p>

  const onChangeValue = (e) => {
    setUpdateboby({ ...upbody, [e.target.name]:e.target.value, id:e.target.id})
  }

  const onSubmitValue = (e) => {
    e.preventDefault()
    const upup = updateTodo({ variables: upbody })
    console.log('obj', upbody);
    console.log('hello :', upup);
  }



    return (
      <div>
        <form
          onSubmit={onSubmitValue}
        >
          {/* <input name="body" onChange={onChangeValue} id={id}/> */}
          <input name="body" onChange={onChangeValue}/>
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );

}

export default UpdateTodo;
