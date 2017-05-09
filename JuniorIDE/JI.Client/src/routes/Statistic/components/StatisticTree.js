import React from 'react';
import {Treebeard} from 'react-treebeard';
import style from './StatisticTreeStyle'

const decorators = {
    Loading: (props) => {
        return (
            <div style={props.style}>
                loading...
            </div>
        );
    },
    Toggle: (props) => {
        return (
            <div className='toggle'>
                <svg className='arrow'>
                </svg>
            </div>
        );
    },
    Header: (props) => {
        return (
            <div style={props.style}>
                {props.node.date}
                <span className={props.node.compiled ? 'tag tag--green' : 'tag tag--red'}>
                    {props.node.compiled ? 'compiled' : 'not compiled'}
                </span>
                <span className={props.node.pass ? 'tag tag--green' : 'tag tag--red'}>
                    {props.node.pass ? 'pass' : 'failed'}
                </span>
            </div>
        );
    },
    Container: (props) => {
        return (
            <div onClick={props.onClick}>
                <props.decorators.Toggle/>
                <props.decorators.Header node={props.node} style={props.style.header}/>
            </div>
        );
    }
};

class TreeExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
            <Treebeard
                data={this.props.data}
                style={style}
                onToggle={this.onToggle}
                decorators={decorators}
            />
        );
    }
}

export default TreeExample
