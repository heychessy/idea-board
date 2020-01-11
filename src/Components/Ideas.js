import React, { Component } from "react";

class Ideas extends Component {
  constructor(props) {
    super(props);
    //initial list
    let ideaList = [
      {
        id: "1234",
        created_date: new Date(),
        title: "Instragram Bot",
        body: "A python script to automate instagram posts.",
        bodyLength: 0
      },
      {
        id: "1235",
        created_date: new Date(),
        title: "Idea Generator",
        body: "A websitre crawler to fetch trending ideas from the internet.",
        bodyLength: 0
      },
      {
        id: "1236",
        created_date: new Date(),
        title: "Franchise Store",
        body: "A cafe franchise of a renowned brand.",
        bodyLength: 0
      }
    ];
    this.state = {
      ideaList: ideaList
    };
  }

  handleTitleChange = (e, id) => {
    e.preventDefault();
    let ideaList = this.state.ideaList;
    ideaList.map((idea, index) => {
      if (index === id) idea.title = e.target.value;
    });
    this.setState({ ideaList });
  };
  handleBodyChange = (e, id) => {
    e.preventDefault();
    let ideaList = this.state.ideaList;
    ideaList.map((idea, index) => {
      if (index === id) {
        idea.body = e.target.value;
        idea.bodyLength = e.target.value.length;
      }
    });
    this.setState({ ideaList });
  };
  removeIdea = index => {
    const ideaList = this.state.ideaList;
    ideaList.splice(index, 1);
    this.setState({ ideaList });
  };
  addIdea = () => {
    const ideaList = this.state.ideaList;
    ideaList.unshift({
      id: ideaList.length + 1,
      created_date: new Date(),
      title: "",
      body: ""
    });
    this.setState({ ideaList });
  };
  onBlur = (e, index) => {
    //Api call to save current Item can be made here...
    //saving in the localstorage
    localStorage.setItem("ideaList", JSON.stringify(this.state.ideaList));
    this.showNotification();
  };

  dropdown = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };
  componentDidMount() {
    if (localStorage.getItem("ideaList")) {
      let ideaList = [];
      ideaList = JSON.parse(localStorage.getItem("ideaList"));
      this.setState({ ideaList });
    }
  }
  sortByTitle = e => {
    e.preventDefault();
    const ideaList = this.state.ideaList;
    ideaList.sort((a, b) => a.title.localeCompare(b.title));
    this.setState({ ideaList });
  };
  sortByDate = e => {
    e.preventDefault();
    const ideaList = this.state.ideaList;
    ideaList.sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    this.setState({ ideaList });
  };
  showNotification = () => {
    var x = document.getElementById("notification");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
  render() {
    return (
      <div className="mainDiv">
        <div className="header">
          <div>
            <h1>Post your Ideas</h1>
          </div>

          <div>
            <button className="addButton" onClick={this.addIdea}>
              Create<i className="material-icons">edit</i>
            </button>
          </div>

          <div className="dropdown">
            <span>Sort</span> <i className="material-icons">sort</i>
            <a href="" onClick={e => this.sortByTitle(e)}>
              <div className="dropdown-content">
                <p>Title</p>
              </div>
            </a>
            <a href="" onClick={e => this.sortByDate(e)}>
              <div className="dropdown-content">
                <p>Date</p>
              </div>
            </a>
          </div>
        </div>

        <ul>
          {this.state.ideaList.map((item, index) => {
            return (
              <li className="list-group-item" key={index}>
                <div className="parentDiv">
                  <div className="inputDiv">
                    <input
                      value={item.title}
                      placeholder="...idea title"
                      onChange={e => this.handleTitleChange(e, index)}
                      onBlur={e => this.onBlur(e, index)}
                    />
                    <textarea
                      maxLength="150"
                      value={item.body}
                      placeholder="....describe your idea (max:150)"
                      onChange={e => this.handleBodyChange(e, index)}
                      onBlur={e => this.onBlur(e, index)}
                    />
                    <div>
                      {item.bodyLength > 135
                        ? `Remaining ${150 - item.bodyLength} chars`
                        : ``}
                    </div>
                  </div>
                  <div className="deleteButton">
                    <button onClick={this.removeIdea}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div id="notification">saved.</div>
      </div>
    );
  }
}
export default Ideas;
