import React, { useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiPictureInPictureExitFill } from "react-icons/ri";
import { Button, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Image } from "../Assects/Img/Img";
import Model from "./Model";
import TableBase from "./TableBase";
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import api from "./Interceptors";


const UserTable = () => {

  const [newUser, setNewUser] = useState({
    name:"",
    email:"",
    phone_number:"",
    message:"",
  })
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [display, setDisplay] = useState(false);
  const [collectedData,setCollectedData] = useState([]);
  const [totalPage,setTotalPage] = useState(1)
  const [userData,setUserData] = useState([])
  const [totalCount, setTotalCount] = useState(0);
  const [errors, setErrors] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("")
  const itemPerPage = 5;

  const startingIndex = (pageNumber * itemPerPage) + 1;
  const endingIndex = Math.min((pageNumber + 1) * itemPerPage, totalCount);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;

  const handleSubmit = () => {
    const errorMessage = {};

    if (!newUser.name) {
      errorMessage.name = "Name is required";
    } else if (errorMessage.name && errorMessage.name.trim()) {
      errorMessage.name = errorMessage.name.trim();
    }

    if (!newUser.message) {
      errorMessage.message = "Message is required";
    } else if (errorMessage.message && errorMessage.message.trim()) {
      errorMessage.message = errorMessage.message.trim();
    }
    
    if (!newUser.email) {
      errorMessage.email = "Email is required";
    } else if (!emailRegex.test(newUser.email)) {
      errorMessage.email = "Invalid email format";
    } else if (errorMessage.email && errorMessage.email.trim()) {
      errorMessage.email = errorMessage.email.trim();
    }
    
    if (!newUser.phone_number) {
      errorMessage.phone_number = "Number is required";
    }else if (!mobileRegex.test(newUser.phone_number)) {
      errorMessage.phone_number = "Invalid phone number format";
    } else if (errorMessage.phone_number && errorMessage.phone_number.trim()) {
      errorMessage.phone_number = errorMessage.phone_number.trim();
    }

    setErrors(errorMessage);

    if (Object.keys(errorMessage).length === 0 && !newUser.id) {
      return newRegistration(newUser)
    }else if (Object.keys(errorMessage).length === 0 && newUser.id){
      setShow(false);
      setNewUser('')
      editUser(newUser)
    } else {
      console.log("Error while sending data:");
    }
  };

  const handlePageClick = (data) => {
    setPageNumber(data.selected);
    fetchData(data.selected + 1);
  };

  const handleClose = () => { 
    Swal.fire({
      title: "Do you want to close?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        setShow(false);
        setEdit(false);
        setDisplay(false);
        setErrors("")
        setNewUser("");
      }
    })
    
  };

  const handleDelete = async(id) => {
    Swal.fire({
      title: "Are you sure need to delete?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
          api.delete(`/admin/testing/deleteUserById?id=${id}`)
          .then((res)=>{
            if (res.data.response.status === "success") {
              toast(res.data.response.message);
              fetchData(1);
            }
          })
      }
    })
  }

  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    setEdit(true);
    getUserById(id)
  }
    
  const handleDisplay = (id)=> {
    setDisplay(true)
    getUserById(id)
  }
   
  const getUserById = async(id) => {
    const res = await api.get(
      `/admin/testing/getUserById?id=${id}`
    );
    setUserData(res.data.response.user);
    if (res.data.response.status === "success") {
      setNewUser({
        id: res.data.response.user.id,
        name: res.data.response.user.name,
        email: res.data.response.user.email,
        phone_number: res.data.response.user.phone_number,
        message: res.data.response.user.message,
      });
    }
    }

  const newRegistration = async (newUser)=>{
    try{
      const post = await api.post('/user/newRegistration',newUser);
      if(post.data.response.status === "success"){
        toast(post.data.response.message);
        setShow(false)
        fetchData(1);
       }
      }catch (error) {
        console.log(error);
      }
  }

  const editUser = async () => {
    try {
      const put = await api.put(
        `/admin/testing/editUserById?id=${newUser.id}`,newUser
      );
      if(put.data.response.status === 'success'){
        toast(put.data.response.message);
        setEdit(false)
        fetchData(1);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const cancelButton = (e)=>{
    e.preventDefault();
    Swal.fire({
      title: "Do you want to cancel?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        setShow(false);
        setEdit(false);
        setDisplay(false);
        setErrors("")
        setNewUser("");
      }
    })
  }

  
  const fetchData = async (data)=>{
    try {
      const res = await api.get(`/admin/testing/getallusers?page=${data}&size=5&search=${searchValue}`);
      setCollectedData(res.data.response.paginationOutput.results)
      setTotalPage(res.data.response.paginationOutput.totalPages)
      setTotalCount(res.data.response.paginationOutput.totalResults)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
  fetchData(1);
  // eslint-disable-next-line
 },[searchValue])

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center my-4 mx-2">
          <h3 className="text-dark">User Table</h3>
          <Button
            
            className="border-0 rounded-2 d-flex align-items-center px-3"
            style={{ background: "#8e75e5" }}
            onClick={handleShow}
          >
            <small>Add User</small>
          </Button>
        </div>
      </div>
      <div className="mx-3 border-0 border-light rounded-3 bg-white">
        <div className="d-flex justify-content-between p-2 flex-column flex-md-row">
          <h5 className="text-nowrap align-items-start">User List</h5>
          <div className="d-flex justify-content-end">
            <div className="search-container">
              <input type="text" name="box" value={searchValue} placeholder="Search for..." onChange={(e)=>setSearchValue(e.target.value)}/>
              <span className="search-icon">
                <Link to="#">
                  <BiSearchAlt2 />
                </Link>
              </span>
            </div>
            <Button 
           className="border-0 rounded-2 d-flex align-items-center px-2 ms-2"
            style={{ background: "#8e75e5" }}
            onClick={()=>{setSearchValue('');fetchData( )}}>Clear</Button>
          </div>
        </div>
        <TableBase collectedData={collectedData} handleEdit={handleEdit} handleDisplay={handleDisplay} handleDelete={handleDelete} itemPerPage={itemPerPage} pageNumber={pageNumber}/>
      </div>
      <div className="d-flex justify-content-between p-3 flex-column flex-md-row">
        <div className="align-items-sm-start align-items-center mb-2">
        <p className="text-nowrap mt-1">Showing {startingIndex} to {endingIndex} of {totalCount} entries</p>
        </div>
        <div className="">
      <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          renderOnZeroPageCount={null}
        />
        </div>
        
      </div>

      <Model show={show} heading={"Add New User"} buttonName={"Submit"} handleSubmit={handleSubmit} handleClose={handleClose} newUser={newUser} setNewUser={setNewUser} errors={errors} cancelButton={cancelButton}/>
      <Model show={edit} heading={"Edit User"} buttonName={"Update"}  handleSubmit={handleSubmit} handleClose={handleClose} newUser={newUser} setNewUser={setNewUser} errors={errors} cancelButton={cancelButton}/>

{display && (
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
                      className="img-fluid my-4"
                      style={{ width: "80px" }}
                      alt="img"
                    />
                    <h5 className="w-100">{userData.name}</h5>
                    <p>Web Designer</p>
                    <Button
                      variant="light"
                      className="d-flex m-auto"
                      style={{color:"#8e75e5"}}
                      onClick={handleClose}
                    >
                      <RiPictureInPictureExitFill/>
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
      )}
      <ToastContainer />
    </>
  );
};

export default UserTable;
