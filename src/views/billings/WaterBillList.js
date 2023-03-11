import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import { MdNumbers } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { GiReceiveMoney, GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { TbReportMoney } from 'react-icons/tb';
import { Modal, Button, Form } from 'react-bootstrap';

const WaterBillList = () => {
  const [data, setData] = useState([
    { id: '1', invoice_num: '10044', unit_num: '253', billed_to: 'Jonieber Dela Victoria', bill_cost: '800 PHP', due_date: '2023-05-30', prev_reading: '1,500 PHP', curr_reading: '1,000 PHP', reading_date: '2023-06-01', penalty: '100 PHP' },
    { id: '2', invoice_num: '25203', unit_num: '102', billed_to: 'Jesulenio Redera', bill_cost: '1,000 PHP', due_date: '2023-06-31', prev_reading: '1,000 PHP', curr_reading: '950 PHP', reading_date: '2023-07-01', penalty: '200 PHP' },
    { id: '3', invoice_num: '30253', unit_num: '301', billed_to: 'James Sevilla', bill_cost: '1,300 PHP', due_date: '2023-02-28', prev_reading: '800 PHP', curr_reading: '500 PHP', reading_date: '2023-04-01', penalty: '0 PHP'},
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    invoice_num: '',
    unit_num: '',
    billed_to: '',
    bill_cost: '',
    due_date: '',
    prev_reading: '',
    curr_reading: '',
    reading_date: '',
    penalty: '',
  });

  useEffect(() => {
    $('#example').DataTable();
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
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

  const handleDeleteButtonClick = (data) => {
    setSelectedData(data);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', due_date: '', prev_reading: '', curr_reading: '',  reading_date: '', penalty: '',  });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', due_date: '', prev_reading: '', curr_reading: '',  reading_date: '', penalty: '' });
    setShowUploadModal(false);
  };


  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.id === selectedData.id ? formData : item
    );
    setData(newData);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', due_date: '', prev_reading: '', curr_reading: '',  reading_date: '', penalty: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.id !== selectedData.id);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">WATER BILL LIST</h1>
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
            <th>Invoice No.</th>
            <th>Unit No.</th>
            <th>Billed To</th>
            <th>Billing Cost</th>
            <th>Due Date</th>
            <th>Prev. Reading</th>
            <th>Curr. Reading</th>
            <th>Reading Date</th>
            <th>Penalty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.invoice_num}</td>
              <td>{entry.unit_num}</td>
              <td>{entry.billed_to}</td>
              <td>{entry.bill_cost}</td>
              <td>{entry.due_date}</td>
              <td>{entry.prev_reading}</td>
              <td>{entry.curr_reading}</td>
              <td>{entry.reading_date}</td>
              <td>{entry.penalty}</td>
              <td>
                {' '}
                <Button
                  className="edit"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  <FaEdit />
                </Button>
                {' '}
                <Button
                  className="delete"
                  onClick={() => handleDeleteButtonClick(entry)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL START */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <br/>
        <h1 className="text-divider">Add New Bill</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="invoice_num" className="addForm">
              <Form.Label className="formIcon"><MdNumbers /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter invoice number"
                name="invoice_num"
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
            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon"><GiReceiveMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter billed to"
                name="billed_to"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="bill_cost" className="addForm">
              <Form.Label className="formIcon"><GiMoneyStack /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter bill cost"
                name="bill_cost"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="due_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="due_date"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="prev_reading" className="addForm">
              <Form.Label className="formIcon"><TbReportMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter previous reading"
                name="prev_reading"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="current_reading" className="addForm">
              <Form.Label className="formIcon"><TbReportMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter current reading"
                name="current_reading"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="reading_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="reading_date"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penalty" className="addForm">
              <Form.Label className="formIcon"><GiPayMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter penalty"
                name="penalty"
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
            <Form.Group controlId="unit_upload" className="addForm">
              <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
              <Form.Control
                className="formField"
                type="file"
                placeholder="Upload CSV"
                name="wbill_upload"
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
        <h1 className="text-divider">Edit Bill</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="invoice_num" className="addForm">
              <Form.Label className="formIcon"><MdNumbers /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter invoice number"
                name="invoice_num"
                value={formData.invoice_num}
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
            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon"><GiReceiveMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter billed to"
                name="billed_to"
                value={formData.billed_to}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="bill_cost" className="addForm">
              <Form.Label className="formIcon"><GiMoneyStack /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter bill cost"
                name="bill_cost"
                value={formData.bill_cost}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="due_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="prev_reading" className="addForm">
              <Form.Label className="formIcon"><TbReportMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter previous reading"
                name="prev_reading"
                value={formData.prev_reading}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="current_reading" className="addForm">
              <Form.Label className="formIcon"><TbReportMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter current reading"
                name="current_reading"
                value={formData.current_reading}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="reading_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="reading_date"
                value={formData.reading_date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penalty" className="addForm">
              <Form.Label className="formIcon"><GiPayMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter penalty"
                name="penalty"
                value={formData.penalty}
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
      {/* EDIT MODAL END */}

      {/* DELETE MODAL START */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
        <br/>
        <h1 className="text-divider">Delete Bill</h1>
        <Modal.Body>
          <p className="confirmation">Are you sure you want to delete this billing?</p>
        </Modal.Body>
        <Modal.Footer className="modalbtn">
          <Button className="primarybtn" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button className="secondarybtn" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
       {/* DELETE MODAL END */}
    </div>
  );
};

export default WaterBillList;