import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Recording from './course/components/Recording.js';
import Home from './home/components/Home.js';
import layout from 'common/layout.css';
import styles from './App.css';

const pages = {
  'home': Home,
  'recording': Recording
};

@Cerebral({
  page: ['currentPage'],
  snackbar: ['snackbar']
})
class App extends React.Component {
  renderPage() {
    const Page = pages[this.props.page];

    return <Page/>;
  }
  render() {
    return (
      <div className={layout.fullHeightContainer}>
        {this.renderPage()}
        <div className={this.props.snackbar.show ? styles.snackbarVisible : styles.snackbar}>
          {this.props.snackbar.text}
        </div>
      </div>
    );
  }
}

export default App;
