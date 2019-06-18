import React from 'react';
import ComponentForTestModalOne from '../../ComponentForTestModalOne';
import ComponentForTestModalTwo from '../../ComponentForTestModalTwo';
import TextShower from '../../common-ui/TextShower';
import TextListShower from '../../common-ui/TextListShower';
import WebSocketListener from '../../WebSocketListener';

class PageMain extends React.Component {
  constructor(props) {
    super(props);
    this.goToLongPage = this.goToLongPage.bind(this);
  }

  goToLongPage() {
    this.props.history.push('/long-page', { fromMainPage: true });
  }

  render() {
    return (
      <div className={'page_animated'}>
        Главная страница (контент)
        <hr />
        <ComponentForTestModalOne />
        <hr />
        <ComponentForTestModalTwo />
        <hr />
        <div onClick={this.goToLongPage}>Перейти на Long page</div>
        <hr />
        Text shower
        <div
          style={{
            width: '300px',
            border: '1px solid black',
            background: 'blue',
          }}
        >
          <TextShower
            text={'Hello, World!!! Hello, World!!! Hello, World!!!'}
          />
        </div>
        <hr />
        Text list shower
        <div
          style={{
            width: '300px',
            border: '1px solid black',
            background: 'blue',
            padding: '10px',
          }}
        >
          <TextListShower
            textLinesList={[
              '1. Hello, World!!! Hello, World!!! Hello, World!!!', //
              '2. Hello, World!!!',
              '3. Hello, World!!! Hello, World!!! Hello, World!!!',
              '4. Hello, World!!! Hello, World!!! Hello, World!!!',
              '5. Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!!',
              '6. Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!!',
              '7. Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!!',
              '8. Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!!',
              '9. Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!! Hello, World!!!',
            ]}
          />
        </div>
        <div
          style={{
            width: '100px',
            border: '1px solid black',
            background: 'blue',
            padding: '10px',
          }}
        >
          <TextListShower
            textLinesList={[
              '1. Hello, World!!! Hello, World!!! Hello, World!!!', //
              '2. Hello, World!!!',
              '3. Hello, World!!! Hello, World!!! Hello, World!!!',
            ]}
          />
        </div>
        <hr />
        <WebSocketListener />
      </div>
    );
  }
}

export default PageMain;
