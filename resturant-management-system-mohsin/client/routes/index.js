import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../actions/users';
import EmptyLayout from '../layouts/EmptyLayout.jsx';
import AppLayout from '../layouts/AppLayout.jsx';
import Login from '../components/authentication/login.jsx';
import Register from '../components/authentication/register.jsx';
import Menu from '../components/menu/menu.jsx';
import AdminDashboard from '../components/admin-dashboard/admin-dashboard.jsx';
import Rider from "../components/rider's-portal/rider's-portal.jsx"
import AdminLayout from '../layouts/AdminLayout.jsx';
import Items from '../components/item/item.jsx';
import AllItems from '../components/item/all-items.jsx';


const AUTHORIZATION = localStorage.getItem('loginToken');
console.log("Toooooooken ::", AUTHORIZATION);
Axios.defaults.headers.common['Authorization'] = `JWT ${AUTHORIZATION}`;

class RenderRoutes extends React.Component {
    
    state = {
      authToken: localStorage.getItem('loginToken'),
      loading: true
    };

    componentDidMount = () => {
      const { authToken } = this.state;
      const { getUser, user } = this.props;
      if (authToken && (!user || !user._id)) {
        getUser();
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    }
  
    renderRoutes = () => {
      const { user } = this.props;
  
      return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            
            {/* <EmptyLayoutRoute path="/login" component={Login} user={user} /> */}
            <EmptyLayoutRoute path="/register" component={Register} user={user} />
            <EmptyLayoutRoute path="/rider's-portal" component={Rider} user={user} />
            <EmptyLayoutRoute path="/menu" component={Menu} user={user} />

            <AdminLayoutRoute path="/admin-dashboard" component={AdminDashboard} user={user} />
            <AdminLayoutRoute path="/items" component={Items} user={user} />
            <AdminLayoutRoute path="/all-items" component={AllItems} user={user} />
            
            <AppLayoutRoute path="/login" component={Login} user={user} />
          
          </Switch>
        </Router>
      );
    }
  
    render() {
      return (
          this.renderRoutes()
      )
    }
};



const EmptyLayoutRoute = ({ component: Component, user, ...rest}) => {
  let showLayout = true;
  if (!user && !user.email) {
    showLayout = false;
  }

  return (
    <Route {...rest} render={matchProps => (
      
      showLayout
      ? ( 
          <EmptyLayout>
            <Component {...matchProps} />
          </EmptyLayout>
        )
      : (
          <Redirect to='/login' />
        )
    )} />
  )

};

const AppLayoutRoute = ({ component: Component, user, ...rest}) => {
  
  const redirectToRelativePage = () => {
    if (user.role==="admin") {
      return (<Redirect to='/admin-dashboard' />);
    } else if (user.role==="customer") {
        return (<Redirect to='/menu' />);
    } else if (user.role==="rider") {
        return (<Redirect to="/rider's-portal" />)
    }
  }
  
  let showLayout = false;
  if ( user && user.email ) {
    showLayout = true;
  }

  return (
    <Route {...rest} render={ matchProps => (
      showLayout
      ? (
        // console.log("True Condition"),
 
        redirectToRelativePage()
      )
      : ( 
        // console.log("False Condition"),
        // <Redirect to="/login" />
        <AppLayout>
          <Component {...matchProps} />
        </AppLayout>
      )
    )} />
  )
};


const AdminLayoutRoute = ({ component: Component, user, ...rest }) => {
  const redirectToRelativePage = () => {
    if (!user._id) {
      return (<Redirect to='/login' />);
    } else if (user.role==="admin") {
      return (<Redirect to='/admin-dashboard' />);
    }
  }

  let showLayout = true;
  if (!user._id || !user.role==="admin") {
    showLayout = false;
  }

  return (
    <Route {...rest} render={matchProps => (
      showLayout
        ? (<AdminLayout>
          <Component {...matchProps} />
        </AdminLayout>)
        : redirectToRelativePage()
    )} />
  )
};


const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  getUser: () => {
    return dispatch(getUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderRoutes);
