import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { getEventService, putEventService, GetTeamsListService } from './EventService';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const FlatButtonStyle = {
    position: 'fixed',
    right: '3%',
    top: '85%',
};

const dateStyle = {
    display: 'inline-block',
    width: '50%'
};

export default class EventEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.id,
            teams: [],
            open: false,
            teamId: this.props.team,
            owner: this.props.owner,
            name: this.props.name,
            description: this.props.description,
            startAt: this.props.startAt,
            duration: this.props.duration,
            budget: this.props.budget ? this.props.budget : 0,
            status: this.props.status,
        };
    }

    componentWillMount(){
        this.getTeamItem();
    }

    getTeamItem = () => {
        GetTeamsListService().then(response => {
            this.setState({
                teams: response.data.teams
            });
        });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleTeams = (event, index, teams) => this.setState({teamId : teams});


    handleName = event => {
        this.setState({name: event.target.value});
    };

    handleDescription = event => {
        this.setState({description: event.target.value});
    };

    handleStartAt = (event, date) => {
        this.setState({startAt: date/1000});
    };

    handleDuration = (event, date) => {
        const duration = (date/1000)-this.state.startAt;
        this.setState({duration: duration });
    };

    handleBudget = event => {
        this.setState({budget: +event.target.value});
    };

    handleStatus = (event, index, status) => this.setState({status});

    handleSave = () => {
        const teamId = this.state.teamId;
        const name = this.state.name;
        const description = this.state.description;
        const startAt = this.state.startAt;
        const budget = this.state.budget;
        const status = this.state.status;
        const duration = this.state.duration;

        putEventService( this.state.eventId, teamId, name, description, startAt, budget, status, duration);
        this.handleClose();
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSave}
            />,
        ];
        return (
            <div>
                <form>
                    <RaisedButton
                        id = "edit-button"
                        label="Edit"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.handleOpen}
                    />
                    <Dialog
                        id = "dialog-buttons"
                        title={this.props.title}
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        <TextField
                            id = "name-input"
                            floatingLabelText="Name:"
                            onChange={this.handleName}
                            hintText='Name'
                            value={this.state.name}
                            fullWidth={true}
                        />
                        <TextField
                            id = "description-input"
                            floatingLabelText="Description:"
                            onChange={this.handleDescription}
                            hintText='Description'
                            value={this.state.description}
                            fullWidth={true}
                        />
                        <DatePicker
                            id ="start-date-input"
                            floatingLabelText="Start date and time."
                            onChange={this.handleStartAt}
                            mode="landscape"
                            style={dateStyle}
                            fullWidth={true}
                            value={new Date(this.state.startAt*1000)}
                        />
                        <TimePicker
                            textFieldStyle={{width: '100%'}}
                            format="24hr"
                            hintText="24hr Format"
                            style={dateStyle}
                            value={new Date(this.state.startAt*1000)}
                            onChange={this.handleStartAt}
                        />
                        <DatePicker
                            floatingLabelText="End date and time."
                            onChange={this.handleDuration}
                            mode="landscape"
                            style={dateStyle}
                            fullWidth={true}
                            value={new Date((this.state.startAt+this.state.duration)*1000)}
                        />
                        <TimePicker
                            textFieldStyle={{width: '100%'}}
                            format="24hr"
                            hintText="24hr Format"
                            style={dateStyle}
                            value={new Date((this.state.startAt+this.state.duration)*1000)}
                            onChange={this.handleDuration}
                        />
                        <SelectField
                            floatingLabelText="Team:"
                            hintText="Team"
                            fullWidth={true}
                            value = {this.state.teamId}
                            onChange={this.handleTeams}
                        >
                            {this.state.teams.map(teams => {
                                return <MenuItem key={teams.id}  value = {teams.id} primaryText = {teams.name} />;
                            })}
                        </SelectField>
                        <TextField
                            id = "budget-input"
                            floatingLabelText="Budget:"
                            onChange={this.handleBudget}
                            hintText='Budget'
                            value={this.state.budget}
                            fullWidth={true}
                        />
                        <SelectField
                            id = "status-input"
                            floatingLabelText="Status"
                            value={this.state.status}
                            onChange={this.handleStatus}
                        >
                            <MenuItem value={0} primaryText="Draft" />
                            <MenuItem value={1} primaryText="Published" />
                            <MenuItem value={2} primaryText="Going" />
                            <MenuItem value={3} primaryText="Finished" />
                        </SelectField>
                    </Dialog>
                </form>
            </div>
        );
    }
}
