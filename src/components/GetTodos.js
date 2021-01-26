import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Button, Card } from 'semantic-ui-react'
// import { BrowserRouter as Router } from 'react-router-dom'

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
        <div>
            {data.getTodos.map(({ id,username, body }) => (
                <Card fluid key={id} style={{ marginLeft: 50 }}>
                    <Card.Content>
                        <Card.Description as={Link} to={`/todos/${id}`} onClick={onClick}>
                            {username} :{body}
                        </Card.Description>

                    </Card.Content>
                </Card>
            ))}
            <Button as={Link} to={"/add"}>Add Todo</Button>
        </div>
    )

}

export default GetTodos