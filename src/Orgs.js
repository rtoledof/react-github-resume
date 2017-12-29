import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class Org extends Component {
    render() {
        return (
            <Col xs={12}>
                <h3>{this.props.org.login}</h3>
                <span>Member</span>

                If you would like more information about this organization, please visit <a href={this.props.org.url}>the organization page</a> on GitHub.
                <hr/>
            </Col>
        )
    }
}

class Orgs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: []
        }
    }

    loadContent() {
        const url = this.props.api+'/orgs';
        fetch(url)
            .then((rsp) => {
                return rsp.json();
            })
            .then((data) => {
                this.setState({orgs: data})
            })
            .catch((err) => {
                this.setState({
                    error: err,
                    msg: "There has been an error"
                });
                console.log("There has been an error");
            })
        ;
    }

    componentWillMount() {
        this.loadContent();
    }

    render() {
        const orgs = [];
        this.state.orgs.forEach((org) => {
           orgs.push(<Org org={org} key={org.id}/>)
        });
        return (
            <Row>
                <Col xs={2}>
                    <h3>Organizations:</h3>
                </Col>
                <Col xs={10}>
                    <Row>
                        {orgs}
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Orgs;