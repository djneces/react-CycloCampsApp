import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { connect } from 'react-redux';

import { addStarRating } from '../../store/actions/form';

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Taking rating either from the props(pre-filled when edited), or from redux when typed
      rating: this.props.rating || this.props.starRating,
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating) {
    this.props.addStarRating(newRating);
    this.setState(() => ({ rating: newRating }));
  }
  render() {
    return (
      <Ratings
        rating={this.state.rating}
        widgetRatedColors='black'
        changeRating={this.changeRating}
        widgetDimensions='35px'
        widgetSpacings='3px'
      >
        <Ratings.Widget widgetHoverColor='#F3513C' />
        <Ratings.Widget widgetHoverColor='#F3513C' />
        <Ratings.Widget widgetHoverColor='#F3513C' />
        <Ratings.Widget widgetHoverColor='#F3513C' />
        <Ratings.Widget widgetHoverColor='#F3513C' />
      </Ratings>
    );
  }
}

const mapStateToProps = ({ form }) => ({
  starRating: form.review.review.stars,
});

export default connect(mapStateToProps, { addStarRating })(StarRating);
