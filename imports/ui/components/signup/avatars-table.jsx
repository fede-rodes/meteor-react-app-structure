import React, { Component, PropTypes } from 'react';

//------------------------------------------------------------------------------
// GLOBALS:
//------------------------------------------------------------------------------
const avatars = [
  { name: 'Alien', id: 1 },
  { name: 'Batman', id: 2 },
  { name: 'Furby', id: 3 },
  { name: 'Ninja', id: 4 },
  { name: 'Spongebob', id: 5 },
  { name: 'Hacker', id: 6 },
  { name: 'Surgeon', id: 7 },
  { name: 'Man-14', id: 8 },
  { name: 'Soldier-3', id: 9 },
  { name: 'Burglar', id: 10 },
];
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
export class AvatarsTable extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    const selectedAvatar = evt.target.alt;
    // console.log(`selectedAvatar: ${selectedAvatar}`);
    this.props.onAvatarSelect(selectedAvatar);
  }

  renderRow(avatarsSubArray) {
    const row = avatarsSubArray.map(({ id, name }) => {
      const { selectedAvatar } = this.props;
      const className = selectedAvatar === name ? 'selected' : '';
      return (
        <td key={id}>
          <img
            src={`/icons/${name}.svg`}
            alt={name}
            height="45"
            width="45"
            onClick={this.handleClick}
            className={className}
          />
        </td>
      );
    });
    return row;
  }

  render() {
    return (
      <div>
        <p>Avatar (<span className="small-font">Optional</span>)</p>
        <p className="small-font">Choose an avatar for your profile</p>
        <br />
        <table className="avatars-table">
          <tbody>
            <tr>
              {this.renderRow([avatars[0], avatars[1], avatars[2], avatars[3], avatars[4]])}
            </tr>
            <tr>
              {this.renderRow([avatars[5], avatars[6], avatars[7], avatars[8], avatars[9]])}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

AvatarsTable.propTypes = {
  selectedAvatar: PropTypes.string.isRequired,
  onAvatarSelect: PropTypes.func.isRequired,
};
