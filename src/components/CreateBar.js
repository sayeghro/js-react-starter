import React, { Component } from 'react';


class CreateBar extends Component {
  // Constructor
  constructor(props) {
    super(props);
    CreateBar.propTypes = {
      addNote: React.PropTypes.func,
    };

    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  // Set state change
  onInputChange(event) {
    this.setState({ title: event.target.value });
  }
  onCreate(event) {
    this.props.addNote(this.state.title);
  }
  render() {
    return (
      <div className="bar_container">
        <input onChange={this.onInputChange} value={this.state.title} />
        <button onClick={this.onCreate}>Create</button>
      </div>
  );
  }
}

export default CreateBar;
