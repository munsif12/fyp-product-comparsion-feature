import React from 'react';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';
//import '../css/styles.css'

class App extends React.Component{
    
    render() {
      return (
        <div className="container-fluid">
         
          { <Header />  }

          <br />
          <Container />

          <br />          
          { <Footer /> }
          
        </div>
      );
    }
}

export default App;



















//const columns  = this.state.columns;
      
      // const columns = [{
      //   dataField: 'content_id',
      //   text: 'Product ID'
      // }, {
      //   dataField: 'content_type',
      //   text: 'Product Name'
      // }];



      {/* <ul>
            {products.map(product => (
              <li key={product.content_id}>
                {product.content_id} {product.content_type}
              </li>
            ))}
          </ul> */}