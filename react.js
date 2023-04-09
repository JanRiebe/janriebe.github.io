'use strict';

const e = React.createElement;


class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        return e("img", {src:"https://pbs.twimg.com/profile_images/1561261703194624000/tczixGIw_400x400.jpg"})
    }
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(ProfilePic));


//TODO use node to transpile JSX
//https://reactjs.org/docs/add-react-to-a-website.html