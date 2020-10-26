import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';

import './Styles.css'


function Contact() {
    
    return (
        <div style={{backgroundColor:"dimgray"}} >                    
            <Container className='header'>
                <Row>               
                </Row>
            </Container>

            <Container >
                <h2 className='header' style={{textAlign:"center"}}>Contact</h2>                                             
                    <Row>
                        <Col xs={{ order: 'first' }} >  
                            <Image width={220} height={200} 
                            src={require("../../asserts/images/logo.jpg")} roundedCircle />            
                        </Col>
                        <Col  >
                        <p>If you are interested or have any question, you can contact me via </p>
                            <a href='mailto:chendian2017@gmail.com'><MailIcon style={{ fontSize: 40 }} /></a>
                            <a href='https://www.linkedin.com/in/dian-chen'><LinkedInIcon style={{ fontSize: 40 }}/></a>
                            <a href='https://github.com/diancici'><GitHubIcon style={{ fontSize: 40 }}/></a>
                        </Col>
                        <Col >              
                        </Col>
                    </Row>
            </Container>

            <Container className="footer" >
                <Row>
                    <Col ></Col>                
                    <Col ></Col>
                </Row>
            </Container>

            
            
        </div>
    )
            
}

export default Contact;