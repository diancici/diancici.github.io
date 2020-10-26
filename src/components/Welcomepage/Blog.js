import React from 'react';
import { Container, Row, Col, Card, CardColumns} from 'react-bootstrap';
import { Link, } from "react-router-dom";



  
function CoverBlog(props) {
  return (   
    
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>  
    
  );
}

const blog1 = {
  title : "App mobile for Image Recognition",
  description : "Developed using the library TensorFlow for React-Native, this app can identify objects by taking photos with deploying a custom-trained image classification model."
};

const blog2 = {
  title : "Creating a personal website from scratch",
  description : "Using React we can quicly create a simple personal website, with basic Javascript/html/CSS,no expertise needed"
};


function Blog() {
   return (    
        
      <div style={{backgroundColor:"ivory"}}>
        <Container className="header" >
          <Row>
            <Col ></Col>                
            <Col ></Col>
          </Row>
        </Container>

        <Container >
          <h2 className='header' style={{textAlign:"center"}}>Blog</h2>  

          <CardColumns>
            <Card>
              <Card.Img variant="top" width={226} height={200} src={require("../../asserts/images/smarthome.jpg")} />
              <CoverBlog title={blog1.title} description={blog1.description} />
              <Card.Footer>
              <small className="text-muted"><Link to='/blog/apptfreact'>Demo and more</Link></small>
              </Card.Footer>   
            </Card>
              
            <Card>
              <Card.Img variant="top"  width={226} height={200} src={require("../../asserts/images/personalWeb.jpg")}/>
              <CoverBlog title={blog2.title} description={blog2.description} />
              <Card.Footer>
              <small className="text-muted">Coming soon</small>
              </Card.Footer>     
            </Card>

          </CardColumns> 
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


  
export default Blog;