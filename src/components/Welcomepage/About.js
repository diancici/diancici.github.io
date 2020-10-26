import React from 'react';
import { Container, Row, Col, Image, Badge} from 'react-bootstrap';

import './Styles.css'


const About=()=> {
  return (     
    <div >
      <Container className="header" >
              <Row>
                <Col ></Col>                
                <Col ></Col>
              </Row>
      </Container> 

      <Container  >       
        <h2 className='header' style={{textAlign:"center"}}>About</h2>  
              
          <Row >
            <Col xs={{ order: 'first' }} >
              <Image width={220} height={200} 
              src={require("../../asserts/images/profile.jpg")} roundedCircle />
            </Col>
            <Col  >
            <div>
              <Badge pill variant="primary">
                Junior Engineering Graduate
              </Badge>{' '}
              <Badge pill variant="info">
                Computer Science
              </Badge>{' '}
              <Badge pill variant="success">
                Embedded Electronics
              </Badge>{' '}
              <Badge pill variant="danger">
                Curiosity + Adventure
              </Badge>{' '}
              <Badge pill variant="warning">
                Gryffindor fan
              </Badge>{' '}
              <Badge pill variant="secondary">
                AI Application
              </Badge>{' '}
              {/*<Badge pill variant="light">
                Reading
              </Badge>{' '}
              <Badge pill variant="dark">
                Travelling
              </Badge>*/}
            </div>                  
            </Col> 
            <Col></Col>   
          </Row>
      </Container>

      <Container className="footer" >
              <Row>
                <Col ></Col>                
                <Col ></Col>
              </Row>
      </Container> 

    </div>


    
  
        
        
    
    
  );
}
export default About;