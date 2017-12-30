import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
// import Input from './components/Input/Input.js'
// es-lint-disable-next-line
// import {Input, TextArea, GenericInput} from 'react-text-input';
import Range from './components/Range';
import registerServiceWorker from './registerServiceWorker';

class RangeGroup extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleTextChange(val) {
    console.log(`Value recieved by parent: ${val}`);
    this.setState({value: Number(val)});
    console.log(this);
  };
  render() {
    let mergeObj = {
      handleTextChange: this.handleTextChange.bind(this)
    };
    if (this.state.value) mergeObj.value = this.state.value;
    if (this.props.children.length === 2) { return (
      <div style={this.props.style}>
        {React.cloneElement(this.props.children[0],
          Object.assign({side: 'left'}, mergeObj)
        )}
        {React.cloneElement(this.props.children[1],
          Object.assign({side: 'right'}, mergeObj)
        )}
      </div>)}
    else { return (
      <div style={this.props.style}>
        {React.cloneElement(this.props.children, {
          side: 'only'})}
      </div>)}
  }
}

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }
  handleUpdate(value) {
    this.props.handleTextChange && this.props.handleTextChange(value)
    this.setState({value: value});
  }
  render() {
    return (
      <input {...this.state} onChange={e => this.handleUpdate(e.target.value)} />
    )
  }
}

let style = {
  margin: '20px',
  padding: '10px',
  width: '210px',
  height: '125px',
  'backgroundColor': 'lightyellow'
};

ReactDOM.render(
  <div style={{padding: '20px'}}>
    <Input value={123} icon="Y" style={{margin: '20px'}} />
    <div style={style}>
      <Range value={30} min={0} max={200} />
    </div>
    <RangeGroup style={style}>
      <Range value={50} min={0} max={100} />
    </RangeGroup>
    <hr style={{marginTop: '50px'}}/>
    <RangeGroup style={style}>
      <Range value={80} min={0} max={150} />
      <Input value={123} icon="Y" />
    </RangeGroup>
  </div>
  , document.getElementById('root')
);
registerServiceWorker();
