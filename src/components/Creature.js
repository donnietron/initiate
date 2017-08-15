// Libs
import React from 'react';
import _ from 'lodash';

// Child Components
import Counter from './Counter';
import {CreateButton} from './CreateButton';

export class Creature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  };

  handleCounterSubmit = label => {
    this.props.onCounterSubmit({label, creatureId: this.props.creature.id});
  };

  handleCreatureDelete = () => {
    this.props.onCreatureDelete(this.props.creature);
  };

  toggleCreatureEdit = () => {
    this.setState({editing: !this.state.editing});
  };

  render() {
    const {creature} = this.props;
    const counters = [];
    if(_.size(this.props.counters) > 0) {
      _.forEach(this.props.counters, (counter) => {
        counters.push(
          <Counter
            key={counter.id}
            counter={counter}
          />
        );
      });
    };
    let className = (!this.state.editing) ? "creature" : "creature editing";
    if (this.props.first === true) { className += " first-initiative"}
    return(
      <div className={className}>
        <h2 className="creature_name">{creature.name}</h2>
        {counters}
        <CreateButton onSubmit={this.handleCounterSubmit} buttonLabel="New Counter" />
        <button className="button__edit" onClick={this.toggleCreatureEdit} >Edit Creature</button>
        <button className="button__delete" onClick={this.handleCreatureDelete} >Delete Creature</button>
      </div>
    );
  };
};
