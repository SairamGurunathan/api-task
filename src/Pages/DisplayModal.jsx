import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Image } from '../Assects/Img/Img'
import { RiPictureInPictureExitFill } from 'react-icons/ri'

const DisplayModal = ({handleClose,userData,display}) => {
  return (
        <Modal show={display} onHide={handleClose} id="user-modal" backdrop={false} >
          <Modal.Header closeButton >
          </Modal.Header>
          <Modal.Body className="p-0">
              <div className="container">
                <div className="row">
                    <div className="card border-0">
                      <div className="row">
                        <div className="col-4 gradient-custom text-center text-white d-flex flex-column align-items-center justify-content-center">
                          <img
                            src={Image.cardImages}
                            className="img-fluid my-4 img-width"
                            alt="img"
                          />
                          <h5 className="w-100">{userData.name}</h5>
                          <p>Web Designer</p>
                          <Button
                            variant="light"
                            className="d-flex m-auto icon-color"
                            onClick={handleClose}
                          >
                            <RiPictureInPictureExitFill className="icon-color"/>
                          </Button>
                        </div>
                        <div className="col-8">
                          <div className="card-body p-0 mt-2">
                            <h6>Information</h6>
                            <hr className="mt-0 mb-4" />
                            <div className="row">
                              <div className="col-12 mb-3">
                                <p className="text-muted">Email</p>
                                <h6 className=" text-wrap">
                                  {userData.email}
                                </h6>
                              </div>
                                <div className="col-12 mb-3">
                                  <p className="text-muted">Phone</p>
                                  <h6 >{userData.phone_number}</h6>
                                </div>
                                <div className="col-12 mb-3">
                                  <p className="text-muted">Message</p>
                                  <h6 className="text-wrap">{userData.message}</h6>
                                </div>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
          </Modal.Body>
        </Modal>
  )
}

export default DisplayModal