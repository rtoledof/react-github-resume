import React, { Component } from "react";
import {
    Row,
    Col,
    Image
} from "react-bootstrap";
import Repos from "./Repos";
import Contributions from "./Contributions";
import Orgs from "./Orgs";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: false,
            msg: ""
        }
    }

    loadContent() {
        if (this.props.api.length === 0) {
            return;
        }
        const url = this.props.api+'users/'+this.props.username;
        fetch(url)
            .then((rsp) => {
                return rsp.json();
            })
            .then((data)=>{
                this.setState({user: data});
            })
            .catch((err) => {
                this.setState({
                   error: err,
                   msg: "There has been an error"
                });
                console.log(err);
                console.log("There has been an error");
            })
        ;

    }
    componentWillMount() {
        console.log(this.props.username);
        if (this.props.username !==  undefined) {
            this.loadContent();
        }
    }
    render() {
        if (this.state.user === undefined ) {
            console.log("Impossible to retrieve the user");
            return (<Row>
                <Col xs={6} xsOffset={4}>
                    <h2>Impossible to retrieve the user</h2>
                </Col>
            </Row>);
        }
        const d = new Date(this.state.user.created_at);
        const api = this.props.api+'users/'+this.props.username;
        return (
            <Row>
                <Col xs={12} id="profile">
                    <Row>
                        <Col xs={6} xsOffset={4}>
                            <Row>
                                <Col xs={12}>
                                    <Image src={this.state.user.avatar_url} circle responsive width="50%"/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6} xsOffset={3}>
                            <strong>Name:</strong> {this.state.user.name}<br/>
                            <strong>GitHub Profile:</strong> On GitHub since {d.getFullYear()}, {this.state.user.name} is a developer based in Seattle with {this.state.user.public_repos} public repositories and {this.state.user.followers} followers.
                        </Col>
                    </Row>
                    <hr/>
                </Col>
                <hr/>
                <Col xs={12} id="site">
                    <Row>
                        <Col xs={4} xsOffset={4}>
                            <h3>Website: <a href={this.state.user.blog} target="_blank">{this.state.user.blog}</a></h3>
                        </Col>
                    </Row>
                    <hr/>
                </Col>
                <Col xs={12}>
                    <Repos username={this.state.user.login} api={api}/>
                    <hr/>
                </Col>
                <Col xs={12} id="contributions">
                    <Contributions username={this.props.username} api={api}/>
                    <hr/>
                </Col>
                <Col xs={12}>
                    <Orgs username={this.state.user.login} api={api}/>
                    <hr/>
                </Col>
                <Col xs={12} id="organizations">
                    <Row>
                        <Col xs={6} xsOffset={3}>
                            {this.state.user.name} - <a href={this.state.user.blog}>{this.state.user.blog}</a> - <a href={this.state.user.url}>{this.state.user.url}</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Profile