import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useReactToPrint } from "react-to-print";
import Pdf from "react-to-pdf";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { BsPercent } from "react-icons/bs";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";

// console.log(checked);

function Edit() {
  var total = 0;
  var Quantity = 0;
  var gsttotal = 0;
  var discountVal = 0;
  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(false);
  const [discount, setDiscount] = React.useState(false);
  const [remove, setRemove] = useState(false);
  const [remove1, setRemove1] = useState(true);
  const [applygst, setApplygst] = useState(false);
  const [applydisct, setApplydisct] = useState(false);
  const [selects, setSelects] = useState(true);
  const [, setValueUpdater] = useState(null);
  const [data1, setData1] = useState({ bill_id: "" });
  const [billInfo, setBillInfo] = useState({
    id: "1",
    has_gst: 0,
    applyGST: false,
    has_discounts: 0,
    payment_mode: "",
    payment_mode_info: "",
    invoice_no: "",
    paid_to: "",
    address: "",
    invoice_date: moment().format("DD/MM/YYYY").toString(),
    bill_description: [
      {
        date: "",
        item_description: "",
        item_price: "",
        quantity: "",
      },
    ],
  });
  const selectData = useSelector((state) => state.homeData);
  // console.log("editData", selectData);

  const handleChange3 = (event) => {
    setChecked(event.target.checked);
    event.target.checked ? setApplygst(true) : setApplygst(false);
  };

  const handleChange4 = (event) => {
    setDiscount(event.target.discount);
    event.target.checked ? setDiscount(true) : setDiscount(false);
    event.target.checked ? setApplydisct(true) : setApplydisct(false);
  };

  const { ToWords } = require("to-words");
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  // in number textfield only to enter numbers not any other symbols and character
  function numberonly(evt) {
    var ch = String.fromCharCode(evt.which);

    if (!/[0-9 || .]/.test(ch)) {
      evt.preventDefault();
    }
  }

  function numberonly1(evt) {
    var ch = String.fromCharCode(evt.which);

    if (!/[0-9]/.test(ch)) {
      evt.preventDefault();
    }
  }

  // submit and console all the form data
  let { id } = useParams();

  const submit = (e1) => {
    e1.preventDefault();
    billInfo["invoice_date"] = moment(billInfo.date).format("DD/MM/YYYY");
    billInfo.bill_description.map(
      (item) => (item["date"] = moment(item.date).format("DD/MM/YYYY"))
    );
    axios
      .post(
        "https://ebilling.iphtechnologies.com/API/api/bill/update",
        billInfo
      )
      .then((res) => {
        // alert(res.data.error);
        // window.location = "http://localhost:3000/create-new-bill";

        toast.success("You have Successfully submitted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })

      .catch((error) => {
        console.log(error);
      });
    setRemove1(false);
    setRemove(false);
    setTimeout(() => {
      navigate("/Home");
    }, 3000);
  };

  useEffect(() => {
    // axios
    //   .get("http://192.168.1.111:8000/api/getbill")
    //   .then((res) => {
    //     setBillInfo(
    //       res.data.bill.filter((item) => item.id === parseInt(id, 10))[0]
    //     );

    //     console.log("res", res.data);
    //   })
    //   .catch(() => {
    //     alert("something went wrong");
    //   });
    setBillInfo(selectData.filter((item) => item.id === parseInt(id, 10))[0]);
  }, []);
  console.log("bill", billInfo);
  const addFields = () => {
    let newfield = {
      item_description: "",
      item_price: "",
      quantity: "",
      date: "",
    };
    billInfo.bill_description.push(newfield);
    setValueUpdater(Math.random());
    setRemove(true);
  };

  // to remove the textfield
  const removeFields = (index) => {
    billInfo.bill_description = billInfo.bill_description.filter(
      (item, i) => i !== index
    );
    setValueUpdater(Math.random());
  };

  const componentRef = useRef(); // to take print of all the form pages
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // React to Download
  const ref = React.createRef();

  const updateBillInfo = (index = "", value, item) => {
    if (index !== "") billInfo.bill_description[index][item] = value;
    else billInfo[item] = value;

    setValueUpdater(Math.random());
  };

  const removeEmptyFields = () => {
    billInfo.bill_description = billInfo.bill_description.filter(
      (item, index) => item.item_description !== ""
    );
    setValueUpdater(Math.random());
  };

  return (
    <Container style={{ width: "800px" }} className="my-5 py-5">
      <Form
        onSubmit={submit}
        className="my-5 position-relative border p-2 shadow rounded"
      >
        <div ref={ref}>
          <div
            ref={componentRef}
            style={{
              border: "1.5px solid black",
              margin: "40px 20px 40px 20px",
              padding: "5px",
            }}
          >
            <Row className="mt-4 mb-4">
              <Col md="6" className="align-self-center">
                <Image src="/images/IPH-LOGO.png" />
              </Col>
              <Col md="6">
                <Form.Text>
                  Address: 25, 2nd Floor, JB Emperor Square, 1212S, Near Apollo
                  Medics Hospital, LDA Colony, Lucknow 226012 <br />
                  Email: Info@iphtechnologies.com
                  <br />
                  Contact : 9580511301/04
                </Form.Text>
              </Col>
              <Col md="12"></Col>
            </Row>
            <hr style={{ border: "1px solid #000000" }} />
            <h6 style={{ textAlign: "center" }}>Payment Voucher</h6>
            <hr style={{ border: "1px solid #000000" }} />

            <Row className="bg-light p-2 m-0 rounded my-2">
              <Col md="6" className="ps-0">
                <FloatingLabel controlId="invoice_num" label="Invoice No">
                  <Form.Control
                    required
                    placeholder="Leave a comment here"
                    className="square rounded"
                    value={billInfo.invoice_no}
                    onChange={(e) => {
                      updateBillInfo("", e.target.value, "invoice_no");
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col md="6" className="pe-0">
                <InputGroup className="h-100 justify-content-end">
                  <InputGroup.Text id="date1">Date</InputGroup.Text>
                  <DatePicker
                    className="form-control rounded-0 w-auto h-100"
                    required
                    name="date1"
                    id="date1"
                    format="DD/MM/YYYY"
                    value={billInfo?.date}
                    onChange={(e) => {
                      updateBillInfo(
                        "",
                        moment(e).format("DD/MM/YYYY"),
                        "invoice_date"
                      );
                    }}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FloatingLabel controlId="paidto" label="Paid To">
                  <Form.Control
                    required
                    name="paidto"
                    placeholder="Leave a comment here"
                    className="square rounded mb-2"
                    value={billInfo.paid_to}
                    onChange={(e) => {
                      updateBillInfo("", e.target.value, "paid_to");
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col md="12">
                <FloatingLabel controlId="address" label="Address">
                  <Form.Control
                    required
                    name="address"
                    as="textarea"
                    placeholder="Leave a comment here"
                    c
                    value={billInfo.address}
                    onChange={(e) => {
                      updateBillInfo("", e.target.value, "address");
                    }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-center align-middle">
                    Date
                  </th>
                  <th colSpan={3} className="text-center">
                    Discription
                  </th>
                  <th rowSpan={2} className="text-center align-middle">
                    Payments
                  </th>
                  {remove1 && (
                    <th rowSpan={2} className="text-center align-middle">
                      Delete Row
                    </th>
                  )}
                </tr>
                <tr>
                  <th>Details</th>
                  <th>Item Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {billInfo &&
                  billInfo.bill_description?.map((values, index) => {
                    total +=
                      values.quantity * values.item_price
                        ? parseFloat(values.quantity * values.item_price)
                        : 0;

                    Quantity += values.quantity
                      ? parseFloat(values.quantity)
                      : 0;

                    gsttotal = Boolean(billInfo ? billInfo.has_gst : 0 || 0)
                      ? (
                          parseFloat(total) +
                          ((billInfo?.has_gst || 0) * parseFloat(total)) / 100
                        ).toFixed(2)
                      : total;

                    discountVal = Boolean(billInfo ? billInfo.has_discounts : 0)
                      ? (
                          parseFloat(gsttotal) -
                          ((billInfo?.has_discounts || 0) *
                            parseFloat(gsttotal)) /
                            100
                        ).toFixed(2)
                      : gsttotal;
                    return (
                      <tr key={index}>
                        <td style={{ height: "10px", width: "100px" }}>
                          <DatePicker
                            required
                            name="Date"
                            type="date"
                            value={values.date}
                            onChange={(e) => {
                              updateBillInfo(
                                index,
                                moment(e).format("DD/MM/YYYY"),
                                "date"
                              );
                            }}
                          />
                        </td>

                        <td style={{ height: "10px", width: "200px" }}>
                          <Form.Control
                            required
                            as="textarea"
                            name="item_description"
                            // class="form-control no-border"
                            value={values.item_description}
                            onChange={(e) => {
                              updateBillInfo(
                                index,
                                e.target.value,
                                "item_description"
                              );
                            }}
                            className="border-0 bg-transparent form-control no-border"
                          />
                        </td>
                        <td style={{ height: "10px", width: "100px" }}>
                          <Form.Control
                            required
                            as="textarea"
                            onKeyPress={numberonly}
                            value={values.item_price}
                            name="item_price"
                            onChange={(e) => {
                              updateBillInfo(
                                index,
                                e.target.value,
                                "item_price"
                              );
                            }}
                            // class="form-control no-border"
                            type="text"
                            style={{ color: "black" }}
                            className="border-0 bg-transparent form-control no-border"
                          />
                        </td>
                        <td>
                          <Form.Control
                            as="textarea"
                            required
                            onKeyPress={numberonly1}
                            value={values.quantity}
                            name="quantity"
                            onChange={(e) => {
                              updateBillInfo(index, e.target.value, "quantity");
                            }}
                            type="text"
                            style={{ color: "black" }}
                            className="border-0 bg-transparent"
                          />
                        </td>

                        <td>
                          <Form.Control
                            onKeyPress={numberonly}
                            // ide="inputBox"
                            value={values.item_price * values.quantity}
                            name="Payments"
                            type="text"
                            style={{ color: "black" }}
                            className="border-0 bg-transparent"
                          />
                        </td>

                        {remove1 && (
                          <td className="text-center align-middle fs-5 ">
                            {/* <i className="bi bi-x-lg"><AiOutlineClose/></i> */}

                            {billInfo.bill_description.length > 1 && (
                              <AiOutlineClose
                                className="text-danger "
                                onClick={() => removeFields(index)}
                              />
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}

                <tr>
                  <td colSpan={1}>Sub Total</td>

                  <td colSpan={2}></td>

                  <td>
                    <Form.Control
                      name="quantity"
                      type="text"
                      value={Quantity}
                      style={{
                        color: "black",
                      }}
                    />
                  </td>

                  <td colSpan={2}>
                    <Form.Control
                      type="text"
                      value={total}
                      style={{
                        color: "black",
                        borderRight: "0px solid white",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Amount in words:</td>
                  <td colSpan={5}>
                    <Form.Text>{toWords.convert(discountVal)}</Form.Text>
                  </td>
                </tr>
                <tr style={{ borderBottom: "2px solid black", width: "100%" }}>
                  <td colSpan={2}>
                    Mode of Payment :
                    <Form.Select
                      required
                      name="pmtmode"
                      value={billInfo.payment_mode}
                      onChange={(e) => {
                        updateBillInfo("", e.target.value, "payment_mode");
                      }}
                    >
                      <option value=""></option>
                      <option value="Online">Online</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="UPI">UPI</option>
                    </Form.Select>
                  </td>

                  <td colSpan={4}>
                    <div style={{ display: "flex" }}>
                      <div style={{ borderBottom: "none", marginLeft: "3px" }}>
                        {selects !== "Cash" ? (
                          <Form.Control
                            className="mt-4"
                            required
                            name="trncid"
                            value={billInfo.payment_mode_info}
                            onChange={(e) => {
                              updateBillInfo(
                                "",
                                e.target.value,
                                "payment_mode_info"
                              );
                            }}
                            placeholder={
                              selects === "Online"
                                ? "Enter the Transaction Id:-"
                                : selects === "Cheque"
                                ? "Enter Cheque Number :-"
                                : selects === "UPI"
                                ? "Enter UPI reference id:-"
                                : "Enter the Transaction Id:-"
                            }
                            style={{
                              width: "200px",
                              outline: "none",
                              border: "none",
                            }}
                          />
                        ) : (
                          " "
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

            <Row
              className="m-0"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col md="auto">
                <Form.Group controlId="ApplyGST">
                  <Form.Check
                    checked={Boolean(
                      parseFloat(billInfo ? billInfo.has_gst : 0 || 0)
                    )}
                    onChange={handleChange3}
                    type="checkbox"
                    label="Apply GST"
                  />
                </Form.Group>
              </Col>
              <Col md="auto" style={{ display: "flex", alignItems: "center" }}>
                {console.log("1234", Boolean(parseInt("0")))}
                <Form.Control
                  maxLength={3}
                  type="text"
                  value={parseFloat(billInfo?.has_gst || 0)}
                  onChange={(e) => {
                    updateBillInfo("", parseFloat(e.target.value), "has_gst");
                  }}
                  style={{
                    color: "green",
                    marginLeft: "10px",
                    width: "55px",
                    border: "none",
                  }}
                />
                <BsPercent
                  style={{
                    color: "green",
                    // marginLeft: "-10px",
                  }}
                />
              </Col>
            </Row>
            <Row className="m-0">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Col md="auto">
                    <Form.Group controlId="ApplyDiscount">
                      <Form.Check
                        checked={Boolean(
                          parseInt(billInfo ? billInfo.has_discounts : 0)
                        )}
                        onChange={handleChange4}
                        type="checkbox"
                        label="Apply Discount"
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    md="auto"
                    style={{ display: "flex", alignItems: "center " }}
                  >
                    <Form.Control
                      maxLength={3}
                      type="text"
                      // onKeyPress={numberonly}
                      value={billInfo?.has_discounts || 0}
                      onChange={(e) => {
                        updateBillInfo(
                          "",
                          parseFloat(e.target.value),
                          "has_discounts"
                        );
                      }}
                      name="disctval"
                      style={{
                        color: "green",
                        marginLeft: "10px",
                        width: "45px",
                        border: "none",
                      }}
                    />
                    <BsPercent
                      style={{
                        color: "green",
                        // marginLeft: "-10px",
                      }}
                    />
                  </Col>
                </div>
                <div>
                  <Row md="10" className="m-0">
                    <Col ml="1" md="auto">
                      Total=
                    </Col>
                    <Col className="ml-10" md="auto">
                      {discountVal}
                    </Col>
                  </Row>
                </div>
              </div>
            </Row>

            <Row className="mb-5 mt-5 ">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Col mr="14">
                  <Form.Text>Authorized By:</Form.Text>
                </Col>
                <Col className="text-end ">
                  <Form.Text>Received By:</Form.Text>
                </Col>
              </div>
            </Row>
          </div>
        </div>

        <Row className="bg-light position-sticky bottom-0 p-2 m-0">
          <Col>
            <Pdf targetRef={ref} filename="Account.pdf">
              {({ toPdf }) => (
                <Button
                  onClick={toPdf}
                  variant="primary"
                  disabled={remove1}
                  className="w-100"
                >
                  Download
                </Button>
              )}
            </Pdf>
          </Col>

          <Col>
            <Button
              variant="primary w-100"
              disabled={remove1}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Col>
          <Col>
            <Button variant="primary w-100" type="submit">
              Submit
            </Button>
            <ToastContainer />
          </Col>
          <Col md="auto">
            {remove && (
              <Button
                variant="danger w-100"
                onClick={() => removeEmptyFields()}
              >
                Clear Blank Rows
              </Button>
            )}
          </Col>
          <Col>
            <Button variant="primary w-100" onClick={addFields}>
              Add Rows
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Edit;
