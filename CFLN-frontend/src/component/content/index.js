
// import './content.scss';
import React from 'react';
import {connect} from 'react-redux';
import CommitItem from '../commit-item/index';
import * as userActions from  '../../action/add-user';
import * as getCommits from  '../../action/get-commits';
import UserAddForm from '../add-user-form/index';

class Content extends React.Component {
  componentWillMount() {
    this.props.getCommits();
  }

  render() {
    return (
      <div>
        <h1> this is a test to see the main page </h1>

        <div>
          <UserAddForm
            onComplete={this.props.addUser}
            onSub={this.props.getCommits}
          />
        </div>

        <div className="commits">
          {this.props.commits ?
            console.log('this is test', this.props.commits)
            // <h1> it works</h1>
            // this.props.commits.map((item, idx) =>
            //   <div className="commit-obj" key={idx}>
            //     <CommitItem
            //       commitItem={item}/>
            //   </div>)
            :
            undefined
          }
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  commits: state.commits,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  addUser : search => dispatch(userActions.addUserAction(search)),
  getCommits : search => dispatch(getCommits.getCommitsAction(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
