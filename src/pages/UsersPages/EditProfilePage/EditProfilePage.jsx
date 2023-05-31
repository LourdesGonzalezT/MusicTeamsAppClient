import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import usersService from '../../../services/users.services'

const EditProfilePage = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [userEdit, setUserEdit] = useState({

        firstName: '',
        lastName: '',
        avatar: '',
        aboutMe: '',
        instrument: '',
        level: '',
        venueFavorites: '',
        friends: '',
        email: '',
        role: '',

    })
    const { firstName, email } = userEdit
    useEffect(() => {
        usersService
            .userEdit(id)
            .then(({ data }) => {
                const {
                    firstName, email
                } = data
                const updateUser = {
                    firstName, email
                }
                setUserEdit(updateUser)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserEdit({ ...userEdit, [name]: value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        usersService
            .userEdit(id, userEdit)
            .then(() => navigate('/'))
            .catch(err => console.log(err))

    }

    return (
        <Container>

            < div > EDIT PROFILE PAGEEEE</div >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={handleInputChange} name="firstName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Guardar cambios editados</Button>
                </div>
            </Form>
        </Container>
    )

}

export default EditProfilePage
