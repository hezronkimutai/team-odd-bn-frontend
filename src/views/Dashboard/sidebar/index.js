import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TopSide from './TopSide';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import SideDrawer from '../../../components/Sidebar/SideDrawer/SideDrawer';
import Backdrop from '../../../components/Sidebar/Backdrop/Backdrop';
import profileActions from '../../../redux/actions/profileActions';


export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      tokenValid: false,
    };
  }
  async componentDidMount() {
    const { getCurrentUserinfo } = this.props;
    await getCurrentUserinfo(this.props.viewProfile);
  }

  componentDidUpdate(prevProps) {
    if (this.props.profileError !== prevProps.profileError) {
      this.setState({ tokenValid: true })
    }
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => ({
      sideDrawerOpen: !prevState.sideDrawerOpen,
    }));
  }
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  }
  render() {
    let backdrop;
    const { sideDrawerOpen } = this.state;
    const { children, profileError, profile } = this.props;
    const { tokenValid } = this.state;

    if (sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    if (tokenValid && profileError && profileError.data.error) {   
      return <Redirect to="/verify-email" />;
    }

    if (tokenValid && profileError && profileError.data.message) {
      localStorage.removeItem('token')
      return <Redirect to="/signin" />;
    }

    if (profile.data && !profile.data.managerId) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        <TopSide drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} />
        <div className="both-side">
          <LeftSide />
          <RightSide RightSideContent={children} />
        </div>
        {backdrop}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.viewProfile.profile,
    profileError: state.viewProfile.profileError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserinfo: () => dispatch(profileActions()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
