import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const Model = ({show,heading,buttonName,handleSubmit,handleClose,newUser,setNewUser,errors,cancelButton}) => {
  return (
    <>
    <Modal show={show} onHide={handleClose} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
    <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter a name" name='name' className='rounded-1' value={newUser.name} onChange={(e)=>setNewUser({...newUser, name:e.target.value})}/>
        {errors.name && (<p className='error'>{errors.name}</p>)}
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter a email" name='email' value={newUser.email} className='rounded-1' onChange={(e)=>setNewUser({...newUser, email:e.target.value})}/>
        {errors.email && (<p className='error'>{errors.email}</p>)}
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Enter a phone number" name='phone_number' value={newUser.phone_number} className='rounded-1' onChange={(e)=>setNewUser({...newUser, phone_number:e.target.value})}/>
        {errors.phone_number && (<p className='error'>{errors.phone_number}</p>)}
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} maxLength={150}  className='rounded-1' name='message' value={newUser.message} onChange={(e)=>setNewUser({...newUser, message:e.target.value})}/>
        {errors.message && (<p className='error'>{errors.message}</p> )}
      </Form.Group>
    </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelButton} className='bg-cancel'>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} className='bg-color' >
            {buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Model