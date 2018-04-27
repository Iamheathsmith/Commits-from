import React from 'react';
// import './add-user-form.scss';

class LowFareForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state)
      .then(() => this.setState({
        userName: '',
      }))
      .catch(error => this.setState({error}));
    this.props.onSub();
  }

  render() {
    return (
      <div>
        <form
          className="lowfare-form generic-form"
          onSubmit={this.handleSubmit}
          noValidate>

          <input
            type="text"
            name="userName"
            placeholder="UserName"
            value={this.state.userName}
            onChange={this.handleChange}/>

          <button className="lowfare-btn" type="submit">Add User</button>
        </form>
      </div>
    );
  }
}

export default LowFareForm;
