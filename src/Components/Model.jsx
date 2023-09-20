import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const Model = ({show,heading,buttonName,handleSubmit,handleClose,cancelButton,formik}) => {
 console.log(formik.errors);
  return (
    <>
    <Modal show={show} onHide={handleClose} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter a name" name='name' className='rounded-1' value={formik.values.name} onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
{formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}     
         </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter a email" name='email' value={formik.values.email} onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
{formik.errors.email && formik.touched.email && (
          <div className="error">{formik.errors.email}</div>
        )}      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Enter a phone number" name='phone_number' className='rounded-1' value={formik.values.phone_number} onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
{formik.errors.phone_number && formik.touched.phone_number && (
          <div className="error">{formik.errors.phone_number}</div>
        )}      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} maxLength={150}  className='rounded-1' name='message' value={formik.values.message} onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
{formik.errors.message && formik.touched.message && (
          <div className="error">{formik.errors.message}</div>
        )}      </Form.Group>
    </form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelButton} className='bg-cancel'>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit} className='bg-color' >
            {buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Model