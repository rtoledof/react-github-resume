import React, { Component } from "react"
import {Row,Col} from "react-bootstrap"

class Repo extends Component {
    render() {
        const repo = this.props.repo;
        const create = new Date(repo.created_at);
        const lUpdate = new Date(repo.pushed_at);
        return (
            <Col xs={12} key={repo.name}>
                <Row>
                    <Col xs={10}>
                        <h3>{repo.name} ({repo.language})</h3>
                    </Col>
                    <Col xs={2}><h3>{create.getFullYear()} - {lUpdate.getFullYear()}</h3></Col>
                    <Col xs={12}>
                        <a href={repo.homepage}>{repo.homepage}</a>
                    </Col>
                    <Col xs={4}>
                        <h4>Watcher(s): {repo.watchers}</h4>
                    </Col>
                    <Col xs={4}>
                        <h4>Fork(s): {repo.forks}</h4>
                    </Col>
                    <Col xs={12}>
                        <h4>Description:</h4>
                        {repo.description}
                    </Col>
                </Row>
                <hr/>
            </Col>
        )
    }
}

class Lang extends Component {
    render() {
        const url ="https://github.com/search?q=user&3A"+this.props.lang.n+"&l="+encodeURIComponent(this.n);
        return (
            <Col xs={3}>
                <a href={url}>{this.props.lang.n}</a>{' '}({Math.round((this.props.p / this.props.total) * 100)} %)
            </Col>
        )
    }
}

class Repos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: []
        }
    }
    loadRepos(page = 1) {
        fetch(this.props.api+'/repos?per_page=100&page='+page)
            .then((rsp) => {
                return rsp.json();
            })
            .then((data) => {
                this.setState({repos: this.state.repos.concat(data)});
                if (data.length === 100 ){
                    this.loadRepos(page + 1);
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
        this.loadRepos(1);
    }

    render() {
        const ls = {};
        const sr = [];
        this.state.repos.forEach((repo, index) => {
           if (repo.language) {
               if (ls.hasOwnProperty(repo.language)) {
                   ls[repo.language]++;
               } else {
                   ls[repo.language] = 1;
               }
               sr.push({
                   position: index,
                   popularity: repo.watchers + repo.forks,
                   info: repo
               });
           }
        });
        function popSort(a, b) {
            return b.popularity - a.popularity;
        }
        sr.sort(popSort);
        const repos = [];
        var it = 0;
        sr.forEach((v) =>  {
            if (it === 4) {
                return;
            }
            repos.push(<Repo repo={v.info} key={v.info.id}/>);
            it++;
        });
        var totalPop = 0;
        function sortL(langs) {
            let sl = [];
            for (var l in langs) {
                if (typeof l === "string") {
                    sl.push({
                       n: l,
                       popularity: ls[l]
                    });
                }
                totalPop += ls[l];
            }
            return sl.sort(popSort);
        }
        const lang = [];
        const sortLand = sortL(ls, ls.length);
        sortLand.forEach((v) => {
            lang.push(<Lang lang={v} p={v.popularity} total={totalPop} key={v.n}/>)
        });
        return(
            <Row>
                <Col xs={12} id="language">
                    <Row>
                        <Col xs={2}>
                            <h3>Languages:</h3>
                        </Col>
                        <Col xs={10}>
                            <Row>
                                {lang}
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Col>
                <Col xs={12} id="repo">
                    <Row>
                        <Col xs={2}><h3>Popular Repos:</h3></Col>
                        <Col xs={10}>
                            {repos}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Repos;