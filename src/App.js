import React, { PureComponent } from 'react';
import {
    Grid,
    Row,
    Col
} from "react-bootstrap";
import './App.css';
import Search from './Search'
import Navigation from './Navigation'
import Profile from './Profile'
import Home from './Home'

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            searchUrl: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(username) {
        this.setState({
          username: username
        })
    }
    render() {
        let content = "";
        console.log(this.state.username);
        if (this.state.username === undefined) {
            content = <Col xs={6} xsOffset={3}>
                        <Home />
                        <Search
                            username={this.state.username}
                            url={this.state.searchUrl}
                            onGenerate={this.handleChange}
                        />
                    </Col>;
        } else {
            content = <Profile username={this.state.username} api={this.props.api}/>;
        }
        return (
            <Grid>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
                <Navigation username={this.state.username} onGenerate={this.handleChange}/>
                <Row>
                    {content}
                </Row>
            </Grid>
        );
    }
}

export default App;
