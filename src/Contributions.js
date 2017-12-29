import React, { PureComponent, Component } from "react";
import { Row, Col } from "react-bootstrap";
class Contrib extends Component {
    render() {
        const rURL = this.props.repo.replace(/https:\/\/api\.github\.com\/repos/, 'https://github.com');
        const rName = this.props.repo.replace(/https:\/\/api\.github\.com\/repos\//, '');
        const cURL = rURL + '/commits?author='+ this.props.username;
        return (<Col xs={12}>
            <Row>
                <Col xs={12}>
                    <strong><a href={rURL}>{rName}</a></strong>
                </Col>
                <Col xs={12}>
                    <p>
                        {this.props.username} has contributed with <a href={cURL}>{this.props.popularity} commit(s)</a>
                    </p>
                </Col>
            </Row>
        </Col>)
    }
}
class Contributions extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            i: []
        }
    }

    loadIssues(page = 1) {
        const url = "https://api.github.com/search/issues?q=type:pr+is:merged+author:"+this.props.username+"&per_page=100&page="+page;
        fetch(url)
            .then((rsp) => {
                return rsp.json();
            })
            .then((data) => {
                const d = data.items.concat(this.state.i);
                this.setState({
                    i: d
                });
                if (data.total_count > 100 && this.state.i.length !== data.total_count && this.state.i.length < 1000) {
                    this.loadIssues(page + 1);
                }
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
        this.loadIssues();
    }

    render() {
        function popSort(a, b) {
            return b.popularity - a.popularity;
        }
        const sorted = [];
        const repos = {};
        if (this.state.i.length === 0) {
            return (<Row>
                <Col xs={3} xsOffset={4}><h3>No Contribution</h3></Col>
            </Row>)
        }
        this.state.i.forEach((v) => {
            if (repos.hasOwnProperty(v.repository_url)) {
                repos[v.repository_url].popularity += 1;
            } else {
                repos[v.repository_url] = { popularity: 1 };
            }
        });
        if (this.state.i.length > 0) {
            for (var i in repos) {
                sorted.push({
                    repo: i,
                    popularity: repos[i].popularity
                })
            }
        }
        sorted.sort(popSort);
        const contrib = [];
        sorted.forEach((v) => {
            contrib.push(<Contrib repo={v.repo} username={this.props.username} popularity={v.popularity} key={v.repo}/>)
        });
        return (<Row>
            <Col xs={2}>
                <h3>Contributions:</h3>
            </Col>
            <Col xs={10}>
                <Row>
                    {contrib}
                </Row>
            </Col>
        </Row>)
    }
}

export default Contributions;