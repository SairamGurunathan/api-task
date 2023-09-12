import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const AddUser = () => {
  const navigate = useNavigate()

  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
    <h3 className="mb-3">Add New User</h3> 
    <Form className='form-width'>
    <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="name" className='rounded-1'/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" className='rounded-1'/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="1234567890" className='rounded-1'/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} className='rounded-1'/>
      </Form.Group>
      <div className='btn-group d-flex '>
      <Button variant="primary" type="submit" className='mt-3 me-2 rounded-1 w-100 border-0 bg-color' onClick={()=>navigate("/dashboard")}>
        submit
      </Button>
      <Button variant="primary" type="submit" className='mt-3 ms-2 rounded-1 w-100 border-0 bg-cancel'  onClick={()=>navigate("/dashboard")}>
        cancel
      </Button>
      </div>
    </Form> 
          
    </div>
    
    </>
  )
}

export default AddUser