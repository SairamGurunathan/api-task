import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import { BiSearchAlt2 } from "react-icons/bi";
import Model from "./Model";
import TableBase from "./TableBase";
import api from "../Global/Interceptors";
import * as yup from "yup";
import { useFormik } from "formik";
import DisplayModal from "../Pages/DisplayModal";
import Pagenate from "../Pages/Pagenate";

const userValidationSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().email("Email is Invalid").required("Email is Required"),
  phone_number: yup.string().required("Number is required").max(10,"Maximum 10 Numbers"),
  message: yup.string().required("Message is required").max(150, "Maximum 150 Characters"),
});

const UserTable = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      values.phone_number = String(values.phone_number);
      if (edit) {
        editUser(values);
        formik.setValues("");
      } else {
        newRegistration(values);
        formik.setValues("");
      }
    },
  });

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [display, setDisplay] = useState(false);
  const [collectedData, setCollectedData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const itemPerPage = 5;

  const startingIndex = (pageNumber * itemPerPage) + 1;
  const endingIndex = Math.min((pageNumber + 1) * itemPerPage, totalCount);

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
        formik.setValues("");
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure need to delete?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        api.delete(`deleteUser?id=${id}`)
          .then((res) => {
            if (res.data.response.status === "success") {
              toast(res.data.response.message);
              fetchData(1);
            }
          });
      }
    });
  }

  const handleShow = () => {
    setShow(true);
    setEdit(false); 
    formik.resetForm();
  };

  const handleEdit = (id) => {
    setEdit(true);
    getUserById(id);
  }

  const handleDisplay = (id) => {
    setDisplay(true);
    getUserById(id);
  }

  const getUserById = async (id) => {
    const res = await api.get(
      `/admin/testing/getUserById?id=${id}`
    );
    setUserData(res.data.response.user);
    if (res.data.response.status === "success") {
      formik.setValues({
        id: res.data.response.user.id,
        name: res.data.response.user.name,
        email: res.data.response.user.email,
        phone_number: res.data.response.user.phone_number,
        message: res.data.response.user.message,
      });
    }
  }

  const newRegistration = async (newUser) => {
    try {
      const post = await api.post('/user/newRegistration', newUser);
      if (post.data.response.status === "success") {
        toast(post.data.response.message);
        setShow(false);
        fetchData(1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editUser = async () => {
    try {
      const put = await api.put(
        `/admin/testing/editUserById?id=${formik.values.id}`, formik.values
      );
      if (put.data.response.status === 'success') {
        toast(put.data.response.message);
        setEdit(false);
        fetchData(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelButton = (e) => {
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
        formik.setValues("");
      }
    })
  }

  const fetchData = async (data) => {
    try {
      const res = await api.get(`/admin/testing/getallusers?page=${data}&size=5&search=${searchValue}`);
      setCollectedData(res.data.response.paginationOutput.results)
      setTotalPage(res.data.response.paginationOutput.totalPages)
      setTotalCount(res.data.response.paginationOutput.totalResults)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line
  }, [searchValue])

  return (
    <>
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-4 mx-2">
        <h3 className="text-dark">User Table</h3>
        <Button
          
          className="border-0 rounded-2 d-flex align-items-center px-3 bg-color"
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
         className="border-0 rounded-2 d-flex align-items-center px-2 ms-2 bg-color"
          onClick={()=>{setSearchValue('');fetchData( )}}>Clear</Button>
        </div>
      </div>
      <TableBase collectedData={collectedData} handleEdit={handleEdit} handleDisplay={handleDisplay} handleDelete={handleDelete} itemPerPage={itemPerPage} pageNumber={pageNumber}/>
    </div>
    <div className="d-flex justify-content-between p-3 flex-column flex-md-row">
      <div className="align-items-sm-start align-items-center mb-2">
      <p className="text-nowrap mt-1">Showing {startingIndex} to {endingIndex} of {totalCount} entries</p>
      </div>
      <div>
      <Pagenate totalPage={totalPage} handlePageClick={handlePageClick} />
      </div> 
    </div>

    <Model show={show} heading={"Add New User"} buttonName={"Submit"} handleSubmit={formik.handleSubmit} handleClose={handleClose} newUser={formik.values} setNewUser={formik.setValues} cancelButton={cancelButton} errors={formik.errors} formik={formik}/>
    <Model show={edit} heading={"Edit User"} buttonName={"Update"}  handleSubmit={formik.handleSubmit} handleClose={handleClose} cancelButton={cancelButton} formik={formik}/>
    <DisplayModal handleClose={handleClose} userData={userData} display={display}/>
    <ToastContainer />
  </>
  );
};

export default UserTable;
