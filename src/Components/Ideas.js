import ReactDOM from "react-dom";
import React, { Component } from "react";

class Ideas extends Component {
  constructor(props) {
    super(props);
    //initial list
    const ideaList = [
      {
        id: "1234",
        created_date: "12/12/19",
        title: "Title",
        body: "this is body",
        bodyLength: 0
      },
      {
        id: "1235",
        created_date: "13/12/19",
        title: "Title2",
        body: "this is body2",
        bodyLength: 0
      }
    ];
    this.state = {
      ideaList: ideaList
    };
  }
  showNotification = () => {
    var x = document.getElementById("notification");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
  handleTitleChange = (e, id) => {
    e.preventDefault();
    let ideaList = this.state.ideaList;
    console.log(id);
    ideaList.map((idea, index) => {
      if (index === id) idea.title = e.target.value;
    });
    this.setState({ ideaList });
  };
  handleBodyChange = (e, id) => {
    e.preventDefault();
    let ideaList = this.state.ideaList;
    console.log(id);
    // if (e.target.value.toString().length > 20)
    // document.getElementById("" + id) = "" + e.target.value.toString().length;

    ideaList.map((idea, index) => {
      if (index === id) {
        idea.body = e.target.value;
        idea.bodyLength = e.target.value.length;
      }
    });
    this.setState({ ideaList });
  };
  removeIdea = index => {
    console.log("removeIdea called");
    const ideaList = this.state.ideaList;
    ideaList.splice(index, 1);
    this.setState({ ideaList });
  };
  addIdea = () => {
    const ideaList = this.state.ideaList;

    ideaList.unshift({
      id: "1235",
      created_date: "13/12/19",
      title: "",
      body: ""
    });
    this.setState({ ideaList });
  };
  onBlur = (e, index) => {
    console.log(index);
    //Api call to save current Item can be made here...
    //saving in the localstorage
    //localStorage.setItem('ideaList',this.state.ideaList);
    this.showNotification();
  };

  dropdown = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };
  componentDidMount() {
    console.log("local storage " + localStorage.getItem("ideaList"));
    if (localStorage.getItem("ideaList")) {
      const ideaList = localStorage.getItem("ideaList");
      this.setState({ ideaList });
    }
  }
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
            <span>Sort</span>
            <div className="dropdown-content">
              <p>Title</p>
            </div>
            <div className="dropdown-content">
              <p>Date</p>
            </div>
          </div>
        </div>

        <ul>
          {this.state.ideaList.map((item, index) => {
            //   var todoClass = item.title ? "done" : "undone";
            return (
              <li className="list-group-item">
                <div className="parentDiv">
                  {/* <span
                        className="glyphicon glyphicon-ok icon"
                        aria-hidden="true"
                        onClick={this.onClickDone}
                      ></span> */}
                  <div className="inputDiv">
                    <input
                      value={item.title}
                      placeholder="...idea title"
                      onChange={e => this.handleTitleChange(e, index)}
                      onBlur={e => this.onBlur(e, index)}
                      //   ref={input => {
                      //     index == 0 && input && input.focus();
                      //   }}
                    />
                    <textarea
                      maxLength="150"
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
                    {/* <button
                    //onClick={this.onClickClose}
                    >
                      <i className="material-icons">edit</i>
                    </button> */}
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
