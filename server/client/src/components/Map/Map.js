import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { connect } from 'react-redux';
import * as d3 from 'd3-ease/dist/d3-ease';

import tentIcon from '../../assets/images/tent.svg';

import './Map.scss';

const Map = ({ fetchedCampgrounds }) => {
  const [viewport, setViewport] = useState({
    latitude: 41.130047,
    longitude: -102.967424,
    width: '100%',
    height: '100vh',
    zoom: 3,
  });

  const [selectedCampground, setSelectedCampground] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setSelectedCampground(null);
  }, []);

  useEffect(() => {
    const listener = (e) => {
      // close Popup on ESC press
      if (e.key === 'Escape') {
        setSelectedCampground(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  // Smooth transition to another picked location
  const changeLocation = (campground) => {
    setViewport({
      ...viewport,
      longitude: campground.geometry.coordinates[0],
      latitude: campground.geometry.coordinates[1],
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    });
  };

  return (
    <div className='Map'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {fetchedCampgrounds.map((campground) => {
          const { geometry, title } = campground;
          return (
            <Marker
              key={campground._id}
              latitude={geometry.coordinates[1]}
              longitude={geometry.coordinates[0]}
            >
              <button
                className='Map__iconButton'
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCampground(campground);
                  changeLocation(campground);
                }}
              >
                <img src={tentIcon} alt={title} />
              </button>
            </Marker>
          );
        })}
        {selectedCampground && (
          <Popup
            latitude={selectedCampground.geometry.coordinates[1]}
            longitude={selectedCampground.geometry.coordinates[0]}
            closeOnClick={false}
            onClose={() => {
              setSelectedCampground(null);
            }}
          >
            <div
              className='Map__popup'
              onClick={() =>
                history.push(`/campgrounds/${selectedCampground._id}`)
              }
            >
              <h3>{selectedCampground.title}</h3>
              <small>{selectedCampground.location}</small>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

const mapStateToProps = ({ campgrounds }) => ({
  fetchedCampgrounds: campgrounds.campgrounds,
});

export default connect(mapStateToProps)(Map);
