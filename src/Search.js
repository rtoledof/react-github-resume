import React, { Component } from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    InputGroup
} from "react-bootstrap"

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: props.username
        }
    }
    getValidationState() {
        if (this.props.username === undefined) {
            return 'error';
        }
        return 'success';
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onGenerate(this.input.value);
    }
    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup
                    controlId="search-input"
                    validationState={this.getValidationState()}>
                    <InputGroup>
                        <div className="form-group has-feedback has-success">
                            <span className="input-group">
                                <input type="text" placeholder="Type a Github user" id="search-input" className="form-control" ref={ (input) => this.input = input }/>
                                    <span className="input-group-addon">
                                        <span className="glyphicon glyphicon-user" />
                                    </span>
                            </span>
                            <span className="form-control-feedback glyphicon glyphicon-ok" />
                        </div>
                    </InputGroup>
                    <FormControl.Feedback />
                </FormGroup>
                <Button type="submit">
                    Generate
                </Button>
            </Form>
        )
    }
}

export default Search