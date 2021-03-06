// Libs
import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Actions
import * as counterActions from '../actions/counters';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      value: props.counter.count
    };
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      value: nextProps.counter.count.toString()
    });
  };

  getAmountFromModifiers = event => {
    if(event.metaKey && event.altKey)
      return 1000
    if(event.metaKey)
      return 10
    if(event.altKey)
      return 100
    if(event.shiftKey)
      return 5
    return 1
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  onClickDelete = event => {
    this.props._counter.counterDelete(this.props.counter);
  };

  handleSetCount = counter => {
    this.props._counter.counterUpdate(counter);
  };

  handleSubmit = event => {
    this.handleSetCount({
      ...this.props.counter,
      count: parseInt(this.state.value,10)
    });
    this.toggleForm();
    event.preventDefault();
  };

  handleFocus = event => {
    event.target.select();
  };

  onClickDecrement = event => {
    this.updateValue(this.getAmountFromModifiers(event) * -1);
  };

  onClickIncrement = event => {
    this.updateValue(this.getAmountFromModifiers(event));
  };

  updateValue = amount => {
    this.handleSetCount({
      id: this.props.counter.id,
      count: this.props.counter.count + amount
    });
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    if(this.state.showForm) {
      return(
        <div className="counter_widget counter_widget_edit">
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus} />
            <input type="submit" value="Save" />
          </form>
        </div>
      );
    };
    return(
      <div className="counter_widget">
        <button className="button button__delete" onClick={this.onClickDelete}>x</button>
        <button className="button button__increment" onClick={this.onClickIncrement}>+</button>
        <a className="counter_count" onClick={this.toggleForm}>{this.props.counter.count}</a>
        <span className="counter_label">{this.props.counter.label}</span>
        <button className="button button__decrement" onClick={this.onClickDecrement}>-</button>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _counter: bindActionCreators(counterActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Counter);
