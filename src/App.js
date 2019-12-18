import React from 'react';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Auth from './containers/Auth'
import Feed from './containers/Feed'
import { connect } from 'react-redux';



const App = (props) => {

  /* Confirm user is authenticated */
  
  if (props.userAuth === false) {

    //return <Auth/>;
  }

  return (
          <div className="">
            <BrowserRouter basename='teamwork'>
              {
                (props.userAuth === false) ?
                <Auth/>
                :
              <div style={{ marginTop: '2rem' }}>
                <Switch>
                  <Route path='/' component={Feed} />
                </Switch>
              </div>

              }
            </BrowserRouter>
          </div>
        );
}
/*


            <Route path='/dashboard' component={Dashboard} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />

            */

const mapStateToProps = state => {

      return {
        ...state
      }
  };
  
  const mapDispatchToProps = dispatch => {
      return {
      }
  };
        
export default connect(mapStateToProps, mapDispatchToProps)(App);
