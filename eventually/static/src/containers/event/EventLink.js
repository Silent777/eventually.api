import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { lightGreen400 } from 'material-ui/styles/colors';
import Event from './Event';
import { googleMapsAPIKey } from '../../helper/keys';

const raiseButtonStyle = {
    display: 'flex',
    justifyContent: 'flex-end'
};

class EventLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };
    }

    goToTaskList = () => {
        this.props.history.push('/events/' + this.props.id);
    };

    fetchAddress() {
        const googleMapsClient = require('@google/maps').createClient({
            key: googleMapsAPIKey
        });
        let location = [this.props.latitude, this.props.longitude];

        googleMapsClient.reverseGeocode({'latlng': location}, (err, response) => {
            if (response.status == 200) {
                let addressComponents = response.json.results[0].address_components;
                let city = this.fetchAddressComponent(addressComponents, 'locality');
                let cityName = city ? city.short_name : null;
                let country = this.fetchAddressComponent(addressComponents, 'country');
                let countryName = country ? country.long_name : null;

                let formattedAddress = [countryName, cityName].filter(el => el).join(', ');
                return this.setState({address: formattedAddress});
            }
        });
    }

    fetchAddressComponent(addressComponents, componentType) {
        return addressComponents.find(component => {
            return component.types.indexOf(componentType) !== -1;
        });
    }

    showAddress = () => {
        if (this.state.address) {
            return 'Location: ' + this.state.address;
        } else {
            return '';
        }
    };

    componentWillMount() {
        this.fetchAddress();
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        actAsExpander={true}
                        showExpandableButton={false}
                        title={this.props.name}
                        subtitle={this.showAddress()}
                    />
                    <CardText>
                        {this.props.description}
                    </CardText>

                    <CardActions>
                        <RaisedButton label="Details" onClick={this.goToTaskList} />
                    </CardActions>
                </Card>
            </div >
        );
    }
}
export default withRouter(EventLink);
