import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'
import DeleteTodo from './DeleteTodo'
// import { BrowserRouter as Router } from 'react-router-dom'
import './GetTodos.css'

const GET_TODOS = gql`
    query getTodos{
        getTodos{
            id
            username
            body
            createdAt 
        } 
    }
`


function GetTodos(params) {
    const { loading, error, data } = useQuery(GET_TODOS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>`Error:${error.message}`</p>


    const onClick = () => {
        console.log('get todo');
    }

    return (
        <div className="cardlist">
            <Card.Group className="gcards" style={{marginTop : 10}}>
                {data.getTodos.map(({ id, username, body }) => (
                    <Card  key={id} style={{ marginLeft: 50 }}>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>Friends of Daegeon</Card.Meta>
                            <Card.Description as={Link} to={`/todos/${id}`} onClick={onClick}>
                                {body}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Approve
                                </Button>
                                <DeleteTodo todoId={id} basic color='red'/>
                            </div>
                        </Card.Content>
                    </Card>
                    // <Card fluid key={id} style={{ marginLeft: 50 }}>
                    //     <Card.Content>
                    //         <Card.Description as={Link} to={`/todos/${id}`} onClick={onClick} >
                    //             <div>{username} :{body}</div>
                    //             <DeleteTodo todoId={id} />
                    //         </Card.Description>

                    //     </Card.Content>
                    // </Card>
                ))}
                <Button className="add-button" as={Link} to={"/add"} >Add Todo</Button>
            </Card.Group>
        </div>
    )

}

export default GetTodos