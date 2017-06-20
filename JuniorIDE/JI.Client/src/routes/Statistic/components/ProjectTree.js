import React from 'react';
import {Treebeard} from 'react-treebeard'
import style from './StatisticTreeStyle'
import { Glyphicon } from 'react-bootstrap'

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
            <span className='toggle--triangle-right fl'>
                <Glyphicon className='glypicon-md'
                    glyph={ props.toggled ? 'triangle-bottom' : 'triangle-right'}/>
            </span>
        );
    },
    Header: (props) => {
        console.log(props.node)
        return (
                !props.node.children
                ?   <div className='statistic-container cursor-pointer' 
                        onClick={function(e){ 
                                props.node.load(props.node.id, props.node.isFolder)
                         }} 
                        style={props.style}>
                         {props.node.name}
                    </div>
                :   <div className='statistic-container cursor-pointer' 
                        onClick={function(e){ 
                                props.node.load(props.node.id, props.node.isFolder)
                        }} 
                        style={props.style}>
                         {props.node.name}
                    </div>
        );
    },
    Container: (props) => {
        return (
            <div onClick={props.onClick} className='mb-10' key={props.node.id}>
                {
                     props.node.children && props.node.children.length > 0 && 
                        <props.decorators.Toggle toggled={props.node.toggled} />
                }
                <props.decorators.Header node={props.node} style={props.style.header}/>
            </div>
        );
    }
};

class ProjectExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);

        this.applyLoad(props.data, this.props.loadFile);
    }
    applyLoad(file, loadFunction){
        file.load = loadFunction;

        for(var i = 0; i < file.children.length; i++){
            this.applyLoad(file.children[i], loadFunction)
        }
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

export default ProjectExample
