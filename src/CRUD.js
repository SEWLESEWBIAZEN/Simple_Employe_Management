import React, { Fragment, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CRUD = () =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setID] = useState();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState(0);
    const [editIsActive, setEditIsActive] = useState(0);
    const [editPhone, setEditPhone] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editId, setEditId] = useState(0);
    const [data, setData] = useState();
    useEffect(() =>
    {
        getData();
    }, [])

    const getData = () =>
    {
        axios.get('http://localhost:5117/api/Employee')
            .then((result) =>
            {
                if (result.status === 200)
                {
                    setData(result.data)
                }
            })
            .catch((error) =>
            {
                console.log(error)
            })


    }

    const handleSave = () =>
    {
        const url = 'http://localhost:5117/api/Employee';
        const data =
        {

            "ID": id,
            "Name": name,
            "Age": age,
            "IsActive": isActive,
            "Role": role,
            "Phone": phone
        }
        axios.post(url, data)
            .then(() =>
            {
                getData();
                clear();
                toast.success('Employee has been added!');

            }).catch((error) =>
            {
                toast.error(error);
            })
    }

    const clear = () =>
    {
        setID('');
        setName('');
        setAge('');
        setPhone('');
        setRole('');
        setIsActive(0);
        setEditPhone('');
        setEditRole('');
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditId('');

    }
    const handleChangeActive = (e) =>
    {
        if (e.target.checked)
        {
            setIsActive(1);
        }
        else
        {
            setIsActive(0);
        }
    }
    const handleEditChangeActive = (e) =>
    {
        if (e.target.checked)
        {
            setEditIsActive(1);
        }
        else
        {
            setEditIsActive(0);
        }
    }


    const handleEdit = (id) =>
    {
        handleShow();
        const url = `http://localhost:5117/api/Employee/${id}`;
        axios.get(url)
            .then((result) =>
            {
                setEditName(result.data.Name);
                setEditAge(result.data.Age);
                setEditIsActive(result.data.IsActive);
                setEditPhone(result.data.Phone);
                setEditRole(result.data.Role);
                setEditId(id);

            })
            .catch((error) =>
            {
                console.log(error);
            })

    }
    const handleDelete = (id) =>
    {
        const url = `http://localhost:5117/api/Employee/${id}`;
        if (window.confirm("Are you sure to delete the employee?") === true)
        {
            axios.delete(url)
                .then((result) =>
                {

                    if (result.status === 204)
                    {
                        getData();
                        toast.success('Employee has been deleted!');


                    }
                }).catch((error) =>
                {
                    toast.error(error);
                })
        }

    }
    const handleUpdate = (id) =>
    {

        const url = `http://localhost:5117/api/Employee/${editId}`;
        const data = {
            "id": editId,
            "name": editName,
            "age": editAge,
            "isActive": editIsActive,
            "role": editRole,
            "phone": editPhone

        }
        axios.put(url, data)
            .then((result) =>
            {
                if (result.status === 204)
                {
                    toast.success(`Employee has been updated!`);
                    getData();
                    clear();
                    handleClose();
                }
                else
                {
                    toast.error(`Employee has not been updated!`);
                    getData();
                    clear();
                    handleClose();
                }

            }).catch((error) =>
            {
                toast.error(error);
            })

    }
    return (
        <Fragment>
            <ToastContainer />

            <Container>

                <Row className="mt-4">
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter ID"
                            value={id} onChange={(e) => setID(e.target.value)}></input>
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Name"
                            value={name} onChange={(e) => setName(e.target.value)}></input>
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Age"
                            value={age} onChange={(e) => setAge(e.target.value)}></input>

                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Phone"
                            value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Role"
                            value={role} onChange={(e) => setRole(e.target.value)}></input>
                    </Col>
                    <Col className="mt-2">
                        <input type="checkbox" checked={isActive === 1 ? true : false}
                            onChange={(e) => handleChangeActive(e)} value={isActive} /> &nbsp;
                        <label>Is Active</label>

                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <hr />
            <h1>List Of Employees</h1>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?

                            data.map((item, index) =>
                            {


                                return (

                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.ID}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Age}</td>
                                        <td>{item.Phone}</td>
                                        <td>{item.Role}</td>
                                        <td>{item.IsActive == 1 ? "Active" : "InActive"}</td>

                                        <td colSpan={2}>
                                            <button className='btn btn-primary mr-2' onClick={() => handleEdit(item.ID)}>Edit</button> &nbsp;
                                            <button className='btn btn-danger ml-2' onClick={() => handleDelete(item.ID)}>Delete</button>

                                        </td>
                                    </tr>
                                )

                            })

                            :
                            "loading......"
                    }


                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify/Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="ID"
                                value={editId} onChange={(e) => setEditId(e.target.value)}></input>
                        </Col>

                        <Col>
                            <input type="text" className="form-control" placeholder="Name"
                                value={editName} onChange={(e) => setEditName(e.target.value)}></input>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Age"
                                value={editAge} onChange={(e) => setEditAge(e.target.value)}></input>

                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Phone"
                                value={editPhone} onChange={(e) => setEditPhone(e.target.value)}></input>

                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Role"
                                value={editRole} onChange={(e) => setEditRole(e.target.value)}></input>

                        </Col>
                        <Col>
                            <input type="checkbox" checked={editIsActive === 1 ? true : false}
                                onChange={(e) => handleEditChangeActive(e)} value={editIsActive} /> &nbsp;
                            <label>Is Active</label>

                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment >
    )

}
export default CRUD