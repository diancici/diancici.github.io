import { DriveEtaRounded } from '@material-ui/icons';
import React, { Component } from 'react';
import { Container, Row, Col, Button, Badge} from 'react-bootstrap';

import './Styles.css'


class AppTFReact extends Component{
    render() {
        return (
            <div > 
                <div className='header'>
                </div> 

                <Container >
                    <Row >
                    <Col xs={0} md={2}></Col>
                    
                    <Col xs={12} md={8} >
                        <h2 className='heading'> Build an APP in React Native for Image Recognition with TensorFlow</h2>
                        <Badge pill variant="primary">
                            TensorFlow 
                        </Badge>{' '}
                        <Badge pill variant="success">
                            React Native
                        </Badge>{' '}
                        <Badge pill variant="danger">
                            Image Classification
                        </Badge>{' '}
                        <Badge pill variant="warning">
                            JavaScript
                        </Badge>{' '}

                        <p className='context'>On February 04, 2020, TensorFlow posted a <a href="https://blog.tensorflow.org/2020/02/tensorflowjs-for-react-native-is-here.html">blog </a> 
                        formally announcing its support for React Native.  
                        This tfjs-react-native package supports GPU backend, Model Loading and Saving, Training, Image & Video Handling. In this blog, we will mainly talk about 
                        how to deploy a pre-trained model of image classification in React-Native for offline image recognition.    
                        </p>

                        <hr></hr>

                        <h4 className='subheading'>Introduction & Motivation </h4>
                        <p>I came across this topic during my internship that the company asked me to make an app in React-Native which identifies products by taking photos.
                            React Native is a framework developed by Facebook for building apps of ios and android. It mainly uses Javascript for coding. For conveience, I trained the model of 
                            image classification with TensorFlow for python. Thanks to this fresh <em><strong>tfjs-react-native package </strong></em>, we can now deploy models trained in python in the envrionment Javascript.
                            This blog will not talk about how to train an image classification model , but will focus on how to deploy the model in React Native.
                        </p>

                        <h4 className='subheading'>Model Preparation </h4>
                        <p>We could find numerous pre-trained models for image classification in <a href='https://tfhub.dev/'>TensorFlow hub</a>. For exemple, we can select :
                            <ul>
                                <li>Problem domain: Image Classfication </li>
                                <li>Architecture: MobileNet V2</li>
                                <li>Dataset: ImageNet(ILSVRC-2012-CLS)</li>
                            </ul>
                            Of course, we could choose another architecture or dataset. It depends on what scenario you want to apply it to. Here we have chosen MobileNet V2 
                            as it is an optimised neural network architecture for efficient on-device image classification and related tasks. The dataset ImageNet is also one of the most used dataset
                            for image classification. In addition to these basic options, we need to pay more attention to the size of the input image that the model requires. Take <a href='https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/4'>this model </a> 
                            for example, its input size is 224x224 pixels. It means that each input image should be treated to fit the input size of the model before using the model.
                        </p>   
                        <p> 
                            Then we can train a customized model from these pre-trained models with the technique <em><strong>Transfer Learning</strong></em>. This will acquire a propre dataset and some basic knowledge
                            of machine learning. We're not going to get into that this time. Generally, we will train the model with TensorFlow for python and the format of the trained model will be <em><strong>SavedModel</strong></em>.    
                        </p>

                        <h4 className='subheading'>Conversion of the model</h4>
                        <p>
                            Since the environment of React Native is Javascript, we have to convert the SavedModel in .js format with <a href='https://github.com/tensorflow/tfjs/tree/master/tfjs-converter'>TF.js converter</a> to get the model in .js. 
                            So why we don't use the js format of pre-trained model from the hub ? Let's firstly see the config parameters of the converter and explain why.
                            After installation as guided, we can convert the model with these conversion flags:
                            <ul>
                                <li>input_format=<em><strong>tf_saved_model</strong></em></li>
                                <li>output_format=<em><strong>tfjs_graph_model</strong></em></li>
                                <li>weight_shard_size_bytes= 4MB/8MB/...</li>
                            </ul> 
                            The converter will generate a model.json with a bunch of <em><strong>group1-shard1ofN.bin </strong></em> files. The model.json represents the architecture of the model and the group-shard.bin files are the weights of the model. Since the tfjs-react-native package only supports one group1-shard.bin file, we have to set the flag weight_shard_size_bytes
                            as large as it could to make sure that only one group-shard.bin file will be generated. Actually, the model of .js format downloaded from the hub contain piles of group-shard.bin files which can not be used in React-Native.             
                        </p>

                        <h4 className='subheading'>Deployment in React Native</h4>
                        <p>Firstly, we will put the model files in local file system so that the app can read the files offline. Then we will create a component in React Native called Camera.
                            This component controls the following two functions:
                            <ul>
                                <li>takePicture : Take and process the pictures  </li>
                                <li>callModelPrediction: Apply the model stored in the file system</li>
                            </ul>
                        </p>
                        <p>
                            In the function takePicture, we will firstly call <em><strong>RNCamera</strong></em> to take a picture of the object. We will then process the image to meet the needs of the model input.
                            We will take the following steps:
                            <ul>
                                <li>Resize the image</li>
                                <li>Reformatting the image : datatype, encoding format, Pixel range</li>
                            </ul>
                            For exemple, the model we use usually requires an image size 1*224*224*3, float32 datatype, tensor encoding format, pixel range[0,1], then we need to take the following steps:
                            <ul>
                                <li>Crop the image to 224*224*3 with <em><strong>ImageEditor</strong></em></li>
                                <li>Convert data encoding format from base64 to Uint8Array, and then from Uint8Array to Tensor Object</li>
                                <li>Normalize the pixel range from [0,255] to [0,1]</li>
                                <li>Convert datatype to float32</li>
                            </ul>
                        </p>
                        <p>
                        After following these steps, we will get an image which meet the model input : <em><strong>[1*224*224*3], float32, Tensor Object,  Pixel values [0, 1]</strong></em>. 
                        Now this processed image can be used as the input to call the model for making a prediction. There are no complicated processing steps in this step.
                        Just remember the most important thing : Model calling method should match the model converter process. That means, we should use <em><strong>tf.loadGraphModel</strong></em> to call the model
                        since we convert the model tf_saved_model to model tfjs_graph_model. If the output of the model is not a graph model, we can't use the method tf.loadGraphModel.
                        </p>
                        <p>The model will output the result after 5 or 10 seconds after calling. The output is an array which represents each possibility for each class of objects.
                            We can extract the maximum possibility and its index to do further processing, for exemple, comparing with the database to find the corresponding product name.
                        </p>

                        <h4 className='subheading'>Demo</h4>
                        <p>
                        Here I'm showing an app made during my internship for the company that can identify specific products offline. It includes an image classification model that recognizes 14 products. 
                        For some products, the recognition accuracy is almost 100%. Of course, the accuracy of the model depends heavily on the dataset, and the angle of the shot will also have an impact on the results.
                        Anyway, this was a bold and encouraging experiment for me. I hope this article can help you with how to apply machine learning to your React-Native application! You can also find an exemple script in 
                        my <a href='https://github.com/diancici/APP-React-Native-Build-with-TensorFlow-.git'>github</a>.
                        </p>
                        <div className='iframe-container'>
                        <iframe 
                            src="https://www.youtube.com/embed/dNqdTC97NVM" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen title='Video: Demo mobile APP for Image Recognition by taking photos '> 
                            <p> 
                                <a href="https://www.youtube.com/embed/dNqdTC97NVM">
                                Fallback link for browsers that don't support iframes
                                </a>
                            </p>
                        </iframe>
                        </div>
                        <hr></hr>
                    </Col>
                    <Col xs={0} md={2}></Col>
                    </Row>
                
                    <Row> 
                        <Col xs={8}></Col>                            
                        <Col><Button variant="secondary" href="/#blog">More blogs</Button> {' '}</Col>
                        <Col></Col>
                    </Row>
                </Container>

                <div className='footer'>
                </div>

            </div>

        );
    }
}

export default AppTFReact;