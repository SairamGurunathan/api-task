import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { LiaSortSolid } from "react-icons/lia";
import { PiEyeBold } from "react-icons/pi";
import { HiOutlineTrash } from "react-icons/hi";
import { BiMessageSquareEdit } from 'react-icons/bi';


const TableBase = ({collectedData,handleDelete,handleDisplay,handleEdit,itemPerPage,pageNumber}) => {
  
  return (
    <>
    <div>
          <Table hover responsive>
            <thead className='text-nowrap'>
              <tr>
                <th className="text-center">
                  S.No <LiaSortSolid />
                </th>
                <th>
                  Name <LiaSortSolid />
                </th>
                <th>
                  Email <LiaSortSolid />
                </th>
                <th>
                  Phone Number <LiaSortSolid />
                </th>
                <th>Message <LiaSortSolid /> </th>
                <th>
                  CreatedAt <LiaSortSolid />
                </th>
                <th>
                  UpdatedAt <LiaSortSolid />
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
            {collectedData.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center">No data available</td>
    </tr>
  ) : (
              collectedData.map((data,index)=>(
                  <tr key={index}>
                  <td className="text-center">{index + 1 + pageNumber * itemPerPage}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.message}</td>
                  <td>{moment(data.createdAt).format('MMMM DD YYYY')}</td>
                  <td>{moment(data.updatedAt).format('MMMM DD YYYY')}</td>
                  <td>
                  <div className="d-flex align-items-center justify-content-center">
                      <button className="btn btn-outline fs-5">
                        <BiMessageSquareEdit className='icon-color' onClick={()=>handleEdit(data.id)}/>
                      </button>
                      <button className="btn btn-outline fs-5">
                        <HiOutlineTrash className='icon-color' onClick={()=>handleDelete(data.id)}/>
                      </button>
                      <button className="btn btn-outline fs-5">
                        <PiEyeBold className='icon-color' onClick={()=>handleDisplay(data.id)}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}  
            </tbody>
          </Table>
        </div>
    </>
  )
}

export default TableBase