import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {lightGreen400} from 'material-ui/styles/colors';
import {TopicDialog} from 'src/containers';
import { postTopicAssignService, getTopicStudentsService, deleteMenteeService } from './TopicServices';
import {getUserId} from 'src/helper';

const cardTextstyle = {
    color: '#455A64',
    fontSize: '15px'
};

const cardHederStyle= {
    fontSize: '25px'
};

const raiseButtonStyle = {
    display: 'flex',
    justifyContent: 'flex-end'
};


export default class TopicItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.isActive,
            isAuthor: false,
            isMentor: false,
            isStudent: false
        };
    }

    cangeExp = (newExpandedState) => {
        this.props.change(this.props.id);
    };

    componentWillMount(){
        getTopicStudentsService(this.props.id).then(response => {
            this.setState({isStudent: response.data['is_student']});
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ expanded: nextProps.isActive });
    }

    handleAssign = () => {
        if (this.state.isStudent) {
            deleteMenteeService (this.props.id).then(response => {
                this.setState({'isStudent': !this.state.isStudent});
            });
        } else {
            const data = {'topicId': this.props.id};
            postTopicAssignService(data).then(response => {
                this.setState({'isStudent': !this.state.isStudent});
            });
        }
    };

    render() {
        let label = '';
        if (this.state.isStudent == true){
            label = 'Leave topic';
        } else{
            label = 'Assign to topic';
        }

        return (
            <div>
                <Card
                    onExpandChange={this.cangeExp}
                    expanded={this.state.expanded}
                >
                    <CardHeader
                        style={cardHederStyle}
                        title={this.props.title}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />

                    <CardText
                        style={cardTextstyle}
                        expandable={true}>
                        {this.props.description}
                        <CardActions>
                            <div style={raiseButtonStyle}>
                                <FlatButton
                                    label={label}
                                    backgroundColor={lightGreen400}
                                    onClick={this.handleAssign} />
                            </div>
                        </CardActions>
                    </CardText>
                </Card>
            </div>
        );
    }
}
