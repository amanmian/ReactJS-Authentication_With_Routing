import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';



////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li><a href="public"><Link to="/public">HOME</Link></a></li>
        <li><a href="protected"><Link to="/protected">DASHBOARD</Link></a></li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome User!
      <br />
      <button className="btn btn-danger" style={{ float: "right", paddingBottom: "56px" , marginRight: "18px", marginTop: "10px", backgroundColor: "#333333" }}
        onClick={() => {
          fakeAuth.signout(() => history.push('/'))
        }}> Sign out
      </button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

const Public = () =>
  <div>
    <h3>HOME</h3>
    <hr />
    <p>
      You can control what page appears when you click Home Open the home page.

On your computer, open Chrome.
At the top right, click More More and then Settings.
Under "Appearance," turn on Show Home button.
Below "Show Home button," choose to use the New Tab page or a custom page
The Home button will appear to the left of your address bar.
                      </p>
  </div>





const Protected = () =>

  <div>
    <h2>Welcome to the Dashboard!</h2>
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      <div class="carousel-inner">
        <div class="item active">
          <img src="http://2.bp.blogspot.com/-7amg1So5sCs/T-bkBTtXOjI/AAAAAAAAB9I/Tms5_BsxKSk/s1600/DSCN3185+(Copy).JPG" alt="temple" style={{width:"100%"}} />
        </div>

        <div class="item">
            <img src="https://aminus3.s3.amazonaws.com/image/g0023/u00022845/i01995655/9ed934debfd34dd12219bcf90d9d1583_large.jpg" alt="Chicago" style={{width:"100%"}}/>
        </div>
    
        <div class="item">
              <img src="https://1.bp.blogspot.com/-oPDo5Bvs0_g/WMX4QyRZCrI/AAAAAAAAGVY/CfgByj-r8PMHluj8hNRtVcTH_GEog8lqQCLcB/s640/Historical%2BGurudwara-Sikh-Tample-Bangla-Sahib-Delhi-HD-Wallpapers-Photos-450x320.png" alt="New york" style={{width:"100%"}}/>
        </div>
      </div>

    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        class Login extends React.Component {
          state = {
            redirectToReferrer: false
          }

  login = () => {
          fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
          })
        }

        render() {
    const {from} = this.props.location.state || {from: {pathname: '/' } }
    const {redirectToReferrer} = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
        )
    }

    return (
      <div className="container jumbotron">
          <p>You must log in to visit dashboard !</p>
          <form>
            <div className="form-group">
              <label> Username * </label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label> Password * </label>
              <input className="form-control" type="password" />
            </div>
          </form>
          <button className="btn btn-success" onClick={this.login}>Log in</button>

        </div>
        )
  }
}

export default AuthExample;