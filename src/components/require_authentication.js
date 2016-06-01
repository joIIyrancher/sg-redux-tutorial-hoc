import React, { Component } from 'react';
import { connect } from 'react-redux';

// Enhanced or composed component is a component wrapped with HOC

export default function(ComposedComponent) {
  class Authentication extends Component {
    // context is something that is just like props but allows us to kind of skip levels
    // in our component hierachy

    // static key word is used to define class level property; ie class method

    // we can only have access to property on context when we declare the need to a 
    // particular property a head of time with contextTypes on each of our classes/components.

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // without this logic, when the user signs out, the page may still show restricted features
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }
    
    render() {
      console.log("context", this.context);
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({ authenticated }) {
    return { authenticated }
  }

  return connect(mapStateToProps)(Authentication);
}


// // In some other location... Not in this file...
// // We want to use this HOC. Below is pseudo-code
// import Authentication // This is my HOC
// import Resources // This is the component I want to wrap

// const ComposedComponent = Authentication(Resources);

// // In some render method...
// <ComposedComponent resources={resourceList} />