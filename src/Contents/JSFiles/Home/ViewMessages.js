import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from 'react';

export const ViewMessage = ({
    name,
    email,
    phone,
    companyname,
    subject,
    message
}) => {

    const [show,
        setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loginStatus,
        setLoginStatus] = useState(false);

    useEffect(() => {
        const data = window
            .localStorage
            .getItem('login')
        if (data != null) 
            setLoginStatus(JSON.parse(data));
        }
    , []);

    return (
        <div style={{
            cursor: "pointer"
        }}>
            <button class = "btn btn-info" href="#" onClick={handleShow}>
                View
            </button>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header>
                    <Modal.Title>Message from {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="card ">
                        <div class="title">
                            <h5>SUBJECT:
                                <strong>{subject}</strong>
                            </h5>
                        </div>
                        MESSAGE
                        <div class="card-body">
                            {loginStatus && <strong>{message}</strong>}
                            {!loginStatus && <strong>Sorry!! Only Admin can view message.
                                <br/>
                                Thanks.</strong>}
                        </div>
                        SENDER INFO: {loginStatus && <div class="flex justify-content-left">
                            <div>Sent by: {name}</div>
                            <div>Phone Number: {phone}</div>
                            <div>Sent from : {email}</div>
                            <div>Company: {companyname}</div>
                        </div>
}
                        {!loginStatus && <strong>Sorry!! Only Admin can view message.
                            <br/>
                            Thanks.</strong>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}