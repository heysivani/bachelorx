function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/chat' />}
    />
  )
}

render() {
  return this.state.loading === true ? <h2>Loading...</h2> : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateRoute>
        <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
        <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
      </Switch>
    </Router>
  );
}