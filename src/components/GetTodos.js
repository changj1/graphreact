import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
// import { BrowserRouter as Router } from 'react-router-dom'

const GET_TODOS = gql`
    query getTodos{
        getTodos{
            id
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

    return data.getTodos.map(({ id, body }) => (
            <Card fluid key={id} style={{ marginLeft: 50 }}>
                <Card.Content>
                    <Card.Description as={Link} to={`/todos/${id}`} onClick={onClick}>
                        {body}
                    </Card.Description>

                </Card.Content>
            </Card>
    ))

}

export default GetTodos