import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export class ModalPopup2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="container">
            <h1 align="center">INSTRUCTIONS</h1>
            <ul>
              <li>
                <img src={require("./NODE/start_node.svg")} />: Start Point
              </li>
              <li>
                <img src={require("./NODE/end_node.svg")} /> : Destination Point
              </li>
              <li>
                <img src={require("./NODE/mid_node.svg")} /> :Another
                Destination Point (through which the shortest path will pass)
              </li>
              <li>
                <b style={{ color: "rgba(0, 190, 218, 0.75)" }}>NODE</b>
                :Visited Nodes start point
              </li>
              <li>
                <b style={{ color: "rgba(199, 118, 247, 0.75)" }}>NODE</b>
                :Visited Nodes from Destination Point
              </li>
              <li>
                <b style={{ color: "yellow" }}>NODE</b>
                :Shortest Path from start point to Destination point
              </li>
              <li>
                CLEAR BOARD: To clear all walls,paths and put the start point
                and End point to their original Position.
              </li>
              <li>
                MAZE ALGORITHMS: Choose any maze algorithm to generate a maze.
              </li>
              <li>
                NODE ACTIONS: Choose any node action to add or delete the mid
                node (second destination point).
              </li>
              <li>
                PATH ALGORITHMS: Choose any path algorithm to find the shortest
                path between start point and destination point.
              </li>
              <li>
                SHOW TIME AND DISTANCE: To show the time taken to find the
                shortest path, and the distance between start point and
                destination point .
              </li>
              <li>
                After finding the shortest path we can move the start point and
                end point in order to know the various shortest paths for the
                same algorithm but different positions of the start point and
                end points.
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
