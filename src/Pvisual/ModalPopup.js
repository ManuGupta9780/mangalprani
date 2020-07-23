import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export class ModalPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { timetaken, pathtravelled } = this.props;
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <div className="container">
            <p>Time taken: {timetaken}ms</p>
          </div>
          <div className="container">
            <p>Distance: {pathtravelled}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
