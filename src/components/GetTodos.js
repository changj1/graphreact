import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image, Pagination } from 'semantic-ui-react'
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
    
    const [todos, setTodos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [todosPerPage,] = useState(6)
    const { loading, error, data } = useQuery(GET_TODOS)
    
    useEffect(() => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>`Error:${error.message}`</p>
        
        return new Promise((resolve, reject)=>{
            resolve(data)
            reject(new Error((error)=>{console.log(error.message)}))
        }).then(setTodos(data.getTodos))

    }, [data, loading, error])

    const indexOfLast = currentPage * todosPerPage;
    const indexOfFirst = indexOfLast - todosPerPage;
    const currentTodo = todos.slice(indexOfFirst, indexOfLast)

    console.log(currentTodo);

    const paginate = (e) => {
        setCurrentPage(e.target.innerHTML)
    }

    return (
        <div className="cardlist">
            <Card.Group className="gcards">
                {currentTodo.map(({ id, username, body }) => (
                    <Card className="eachcard" key={id}>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>Friends of Daegeon</Card.Meta>
                            <Card.Description as={Link} to={`/todos/${id}`} >
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
                ))}
                <Button className="add-button" as={Link} to={"/add"} >Add Todo</Button>
            </Card.Group>
            <Pagination defaultActivePage={1} totalPages={todos.length/todosPerPage} 
                onClick={paginate}
            />
        </div>
    )

}

export default GetTodos