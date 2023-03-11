import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../all-views-scss/_datatable.scss'
import { FaEdit, FaFilter } from 'react-icons/fa';
import { MdDriveFileRenameOutline, MdContactPhone, MdNumbers } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { HiIdentification } from 'react-icons/hi';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { CgUserList } from 'react-icons/cg';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';

const GuestList = () => {
  const [data, setData] = useState([
    { unit_id: '1', guest_num: '23', unit_num: '253', first_name: 'Jonieber', last_name: 'Dela Victoria', contact_no: '09642158124', date_visit: '2023-05-23', status: 'Approved' },
    { unit_id: '2', guest_num: '12', unit_num: '103', first_name: 'Jesulenio', last_name: 'Redera', contact_no: '09655984218', date_visit: '2023-01-12', status: 'Declined' },
    { unit_id: '3', guest_num: '50', unit_num: '101', first_name: 'Felix', last_name: 'Chua', contact_no: '09548223148', date_visit: '2023-05-03', status: 'Approved' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    guest_num: '',
    unit_num: '',
    first_name: '',
    last_name: '',
    contact_no: '',
    date_visit: '',
    status: '',
  });

  useEffect(() => {
    $('#example').DataTable();
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.guest_num]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleUploadEntry = () => {
    setShowUploadModal(true);
  };

  const handleEditButtonClick = (data) => {
    setSelectedData(data);
    setFormData(data);
    setShowEditModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ guest_num: '', unit_num: '', first_name: '', last_name: '', contact_no: '', date_visit: '', status: '' });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ guest_num: '', unit_num: '', first_name: '', last_name: '', contact_no: '', date_visit: '', status: '' });
    setShowUploadModal(false);
  };


  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.unit_id === selectedData.unit_id ? formData : item
    );
    setData(newData);
    setFormData({ guest_num: '', unit_num: '', first_name: '', last_name: '', contact_no: '', date_visit: '', status: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">GUEST LIST</h1>
      </div>
      <div className="table-head">
        <Form.Group controlId="dateFrom" className="filter-date-from">
          <Form.Label className="filter-date-label">From</Form.Label>
          <Form.Control
            className="filter-date-input"
            type="date"
            placeholder="yyyy-mm-dd"
            name="datFrom"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="dateTo" className="filter-date-to">
          <Form.Label className="filter-date-label">To</Form.Label>
          <Form.Control
            className="filter-date-input"
            type="date"
            placeholder="yyyy-mm-dd"
            name="dateTo"
            onChange={handleInputChange}
          />
        </Form.Group>
        <CFormSelect className="costum-select">
          <option value="">Filter by Status</option>
          <option value="Approve">Approve</option>
          <option value="Decline">Decline</option>
        </CFormSelect>
        <div className="thead-btn">
          <Button className="thead-btn-primary" name="filter" type="submit">
            <FaFilter />
          </Button>
          <Button className="thead-btn-secondary">
            <FiRefreshCcw />
          </Button>
          <Button className="thead-btn-tertiary" onClick={handleAddNewEntry}>
            <BsFillPlusSquareFill />
          </Button>
          <Button className="thead-btn-quaternary" onClick={handleUploadEntry}>
            <FiUpload />
          </Button>
        </div>
      </div>
      
      <div className="divider"></div><hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Gues Number</th>
            <th>Unit Number</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Contact Number</th>
            <th>Date of Visit</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.unit_id}>
              <td>{entry.unit_id}</td>
              <td>{entry.guest_num}</td>
              <td>{entry.unit_num}</td>
              <td>{entry.first_name}</td>
              <td>{entry.last_name}</td>
              <td>{entry.contact_no}</td>
              <td>{entry.date_visit}</td>
              <td>
                <Form.Label className="toggle">
                  <Form.Control type="checkbox" />
                  <span className="slider"></span>
                  <span className="labels" data-on="Approved" data-off="Declined"></span>
                </Form.Label>
              </td>
              <td>
                {' '}
                <Button
                  className="edit"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  <FaEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL START */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <br/>
        <h1 className="text-divider">Add New Guest</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="unit_id" className="addForm">
              <Form.Label className="formIcon"><HiIdentification /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit ID"
                name="unit_id"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="guest_num" className="addForm">
            <Form.Label className="formIcon"><CgUserList /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter guest number"
                name="guest_num"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="unit_num" className="addForm">
              <Form.Label className="formIcon"><MdNumbers /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unit_num"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="first_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter firstname"
                name="first_name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="last_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter lastname"
                name="last_name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="contact_no" className="addForm">
              <Form.Label className="formIcon"><MdContactPhone /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter contact number"
                name="contact_no"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="date_visit" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                placeholder="yyyy-mm-dd"
                name="date_visit"
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* ADD MODAL END */}

      {/* UPLOAD MODAL START */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <br/>
        <h1 className="text-divider">Upload CSV</h1>
        <Modal.Body>
          <Form onSubmit={handleUploadFormSubmit}>

            <Form.Group controlId="guest_upload" className="addForm">
              <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
              <Form.Control
                className="formField"
                type="file"
                placeholder="Upload CSV"
                name="guest_upload"
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* UPLOAD MODAL END */}

      {/* EDIT MODAL START */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <br/>
        <h1 className="text-divider">Edit Guest</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
          <Form.Group controlId="unit_id" className="addForm">
              <Form.Label className="formIcon"><HiIdentification /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit ID"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="guest_num" className="addForm">
            <Form.Label className="formIcon"><CgUserList /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter guest number"
                name="guest_num"
                value={formData.guest_num}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="unit_num" className="addForm">
              <Form.Label className="formIcon"><MdNumbers /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unit_num"
                value={formData.unit_num}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="first_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter firstname"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="last_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter lastname"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="contact_no" className="addForm">
              <Form.Label className="formIcon"><MdContactPhone /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter contact number"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="date_visit" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                placeholder="yyyy-mm-dd"
                name="date_visit"
                value={formData.date_visit}
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* EDIT MODAL ENDS */}
    </div>
  );
};

export default GuestList;