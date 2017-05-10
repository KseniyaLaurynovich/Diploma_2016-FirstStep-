import React from 'react';
import {Treebeard} from 'react-treebeard'
import style from './StatisticTreeStyle'
import { Glyphicon } from 'react-bootstrap'

const url = "https://JuniorIDE-site.com/tasks/testFile/?testFileId="

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
            <span className='toggle--triangle-right'>
                <Glyphicon className='glypicon-md'
                    glyph={ props.toggled ? 'triangle-bottom' : 'triangle-right'}/>
            </span>
        );
    },
    Header: (props) => {
        return (
                !props.node.subitem
                    ?   <div className='statistic-container' style={props.style}>
                            {props.node.date}
                            <span className={props.node.compiled ? 'tag tag--green' : 'tag tag--red'}>
                                {props.node.compiled ? 'compiled' : 'not compiled'}
                            </span>
                            <span className={props.node.pass ? 'tag tag--green' : 'tag tag--red'}>
                                {props.node.pass ? 'pass' : 'failed'}
                            </span>
                        </div>
                    : <div className='statistic-container statistic-subcontainer' style={props.style}>
                            <span className={props.node.pass ? 'tag tag--green' : 'tag tag--red'}>
                                {props.node.pass ? 'pass' : 'failed'}
                            </span>
                            { 'Input:' } <a target="_blank" href={url + props.node.inputFileId}>{ props.node.inputFileName }</a>
                            { ' Output:' } <a target="_blank" href={url + props.node.outputFileId}>{ props.node.outputFileName }</a>
                        </div>
        );
    },
    Container: (props) => {
        return (
            <div onClick={props.onClick} className='mb-10' key={props.node.id}>
                {
                     props.node.children && props.node.children.length > 0 && 
                        <props.decorators.Toggle toggled={props.node.toggled}/>
                }
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
