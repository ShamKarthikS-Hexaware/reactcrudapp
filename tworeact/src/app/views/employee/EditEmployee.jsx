import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editEmployee } from './store/employee.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditEmployee = () => {
    const { id: employeeId } = useParams()

    const employee = useSelector((state) =>
        state.employee.entities.find(
            (employee) => employee.id.toString() === employeeId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(employee.name)
    const [email, setEmail] = useState(employee.email)
    const [age, setAge] = useState(employee.age)
    const [online, setOnline] = useState(employee.online)

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleAge = (e) => setAge(parseInt(e.target.value))
    const handleOnline = (e) => setOnline(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editEmployee({
                id: employeeId,
                name,
                email,
                age,
                online,
            })
        )
        navigate('/employee')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditEmployee', path: '/employee' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="email"
                                id="emailInput"
                                onChange={handleEmail}
                                value={email}
                                validators={['required']}
                                label="Email"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age || ''}
                                validators={['required']}
                                label="Age"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={online}
                                onChange={handleOnline}
                                select
                                id="onlineInput"
                                label="Online"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditEmployee
