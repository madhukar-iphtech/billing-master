import "../App.css";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "react-bootstrap/Modal";

import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHomeData } from "../redux/action/homeAction";

export default function Home() {
  const selectData = useSelector((state) => state.homeData);

  // console.log("selectData", selectData);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [, setRender] = useState(false);
  const [remove, setRemove] = useState(false);
  const [remove1, setRemove1] = useState(false);
  const [deleteAction, setDeleteAction] = useState({
    actionType: "",
    id: null,
  });

  const Navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "https://ebilling.iphtechnologies.com/API/api/getbill"
    );
    // console.log("1234", result?.length);
    // dispatch(addHomeData(result));
    // console.log("result", result.data.bill);
    setData(result?.data);
    // console.log("result", result.data.bill);
    dispatch(addHomeData(result.data.bill));
    // dispatch(addHomeData(result.data.bill));
    // console.log("5224", data.bill.length);
    data?.bill.length > 2 ? setRemove1(true) : setRemove1(false);
  };

  const handleCheckbox = (index = "", e) => {
    if (index === "") {
      data?.bill.map((item) => {
        item.isChecked = e.target.checked;
        return item;
      });
    } else {
      data.bill[index].isChecked = e.target.checked;
    }
    setRender(Math.random());
    e.target.checked ? setRemove(true) : setRemove(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = (actionType = "deleteAll", id) => {
    setShow(true);

    setDeleteAction({ ...deleteAction, id: id, actionType: actionType });
  };

  const deleteAll = async () => {
    await axios.post(
      "https://ebilling.iphtechnologies.com/API/api/bill/delete",
      {
        ids: data?.bill.filter((item) => item?.isChecked === true),
      }
    );
    loadUsers();
    window.location.reload();
  };

  // console.log(deleteAction);

  const deleteUser = async (id) => {
    await axios.post(
      "https://ebilling.iphtechnologies.com/API/api/bill/delete",
      {
        ids: [id],
      }
    );
    loadUsers();
    window.location.reload();
  };

  return (
    <Container className="my-5 py-5">
      <Row className="text-right">
        <Col md="12" className="text-end">
          {remove && (
            <Button
              className="btn btn-danger btn-warning"
              onClick={() => handleShow()}
            >
              Delete Bill
            </Button>
          )}
          <a
            onClick={() => Navigate("/create-new-bill")}
            className="btn btn btn-warning m-3 "
          >
            Create New Bill
          </a>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to Delete this Bill</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              deleteAction.actionType === "deleteAll"
                ? deleteAll()
                : deleteUser(deleteAction.id)
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Table className="striped bordered hover">
        <thead style={{ backgroundColor: "#5C5C5C", color: "white" }}>
          <tr>
            <td>
              {data?.bill.length > 0 && (
                <Form.Check onChange={(e) => handleCheckbox("", e)} />
              )}
            </td>

            <th>Invoice No.</th>
            <th>Paid To</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.bill?.map((values, index) => {
              return (
                <tr key={index} style={{}}>
                  {
                    <td>
                      <Form.Check
                        value={values.id}
                        checked={values.isChecked}
                        onChange={(e) => handleCheckbox(index, e)}
                      />
                    </td>
                  }
                  <td>{values.invoice_no}</td>
                  <td>{values.paid_to}</td>
                  <td>{moment(values.created_at).format("DD MMM, YYYY")}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <a
                        className="btn btn-light btn-sm"
                        onClick={() => Navigate(`/Home/view/${values.id}`)}
                      >
                        View
                      </a>
                      <Button
                        className="btn btn-primary  btn-sm mx-2"
                        onClick={() => Navigate(`/Home/Edit/${values.id}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        className="btn btn-danger  btn-sm"
                        onClick={() => handleShow("delete", values.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}
