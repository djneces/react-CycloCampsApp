import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { connect } from 'react-redux';
import * as d3 from 'd3-ease/dist/d3-ease';

import tentIcon from '../../assets/images/tent.svg';
import Image from '../UIElements/Image';

import './Map.scss';

const Map = ({ fetchedCampgrounds, selectedCampgroundCoords }) => {
  const [viewport, setViewport] = useState({
    latitude: 41.130047,
    longitude: -102.967424,
    width: '100%',
    height: '100vh',
    zoom: 3,
  });

  const [selectedCampground, setSelectedCampground] = useState(null);
  const [popupIsOpen, setPopUpIsOpen] = useState(null);

  const history = useHistory();

  // Close Popup on ESC press
  useEffect(() => {
    const listener = (e) => {
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
  const changeLocation = (coordinates, zoomLevel = 3) => {
    setViewport({
      ...viewport,
      longitude: coordinates[0],
      zoom: zoomLevel,
      latitude: coordinates[1],
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    });
  };

  useEffect(() => {
    if (selectedCampgroundCoords) {
      setSelectedCampground(null);
      setPopUpIsOpen(false);
      changeLocation(selectedCampgroundCoords, 10);
    }
  }, [selectedCampgroundCoords]);

  // Set hovered style when hover on the Marker
  const handleOnHover = (e) => {
    const campgroundId = e.currentTarget.dataset.btnid;
    const div = document.getElementById(`${campgroundId}`);
    if (div) {
      if (selectedCampground && campgroundId === selectedCampground._id) return;
      div.classList.toggle('hovered');
    }
  };

  const removeHoverStyle = () => {
    const divs = document.querySelectorAll('.CampgroundsListItem');
    divs.forEach((div) => div.classList.remove('hovered'));
  };

  // Set hovered style when clicked on the Marker
  useEffect(() => {
    if (selectedCampground && popupIsOpen) {
      const { _id } = selectedCampground;
      const div = document.getElementById(`${_id}`);
      if (div) {
        div.classList.add('hovered');
      }
    }
    if (!popupIsOpen) {
      removeHoverStyle();
    }
  }, [selectedCampground, popupIsOpen]);

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
                onMouseOver={handleOnHover}
                onMouseOut={handleOnHover}
                data-btnid={campground._id}
                onClick={(e) => {
                  e.preventDefault();
                  // remove hover style in case other Marker had been previously clicked
                  removeHoverStyle();
                  setSelectedCampground(campground);
                  setPopUpIsOpen(true);
                  changeLocation(campground.geometry.coordinates);
                }}
              >
                <img
                  src={tentIcon}
                  alt={title}
                  onMouseOver={handleOnHover}
                  onMouseOut={handleOnHover}
                />
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
              setPopUpIsOpen(false);
            }}
          >
            <div
              className='Map__popup'
              onClick={() =>
                history.push(`/campgrounds/${selectedCampground._id}`)
              }
            >
              <Image
                image={selectedCampground.images[0].url}
                alt={selectedCampground.title}
              />
              <div className='Map__popup-body'>
                <h3>{selectedCampground.title}</h3>
                <small>{selectedCampground.location}</small>
              </div>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

const mapStateToProps = ({ campgrounds }) => ({
  fetchedCampgrounds: campgrounds.campgrounds,
  selectedCampgroundCoords: campgrounds.selectedCampground.coords?.coordinates,
});

export default connect(mapStateToProps)(Map);
