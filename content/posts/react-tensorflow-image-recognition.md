+++
date = '2025-11-15T19:02:39+01:00'
draft = true
title = 'Build an APP with React Native for Image Recognition'
+++

On February 04, 2020, TensorFlow posted a [blog](https://blog.tensorflow.org/2020/02/tensorflowjs-for-react-native-is-here.html) formally announcing its support for React Native.The `tfjs-react-native` package supports GPU backend, model loading/saving, training, image & video handling.  

I came across this topic during my internship that the company asked me to make an app which can identify products by taking photos. In this article, we mainly focus on deploying a pre-trained image classification model to React Native for offline image recognition. We are going to build a React-Native app which can identify an object by taking a photo.

React Native is a framework developed by Facebook for building iOS and Android apps. It mainly uses Javascript for coding. For convenience, I trained a TensorFlow image classification model in Python.  Thanks to the new **`tfjs-react-native` package**, we can now directly deploy Python-trained models into JavaScript environments. This blog does not cover training models, but focuses on how to deploy the python trained model to React Native environment.

## Model Preparation

You can find many pre-trained image classification models on [TensorFlow Hub](https://tfhub.dev/).

The pre-trained model used for this project:

- Problem domain: **Image Classification**
- Architecture: **MobileNet V2**
- Dataset: **ImageNet (ILSVRC-2012-CLS)**

Of course, we could choose another architecture or dataset. It depends on what scenario you want to apply it to. Here we have chosen MobileNet V2 as it is an optimised neural network architecture for efficient on-device image classification and works well for mobile apps. The dataset ImageNet is also one of the most used dataset for image classification.Pay attention to **input image size**.  For example this [MobileNet V2 model](https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/4) expects 224×224 pixels, meaning the input image should be resized to 224x224 pixels before feeding to the model. 

After choosing the pre-trained model, we need to fine-tune this model with our own custom datasets to get a customised model. This is called **Transfer Learning**. This will acquire a proper dataset and some basic knowledge of machine learning. We're not going to get into that this time. Generally, we will train the model with TensorFlow in python and the format of the trained model is usually called **SavedModel**.    

## Conversion of the Model

React Native runs JavaScript, so we must convert the SavedModel to JS format using the  [TensorFlow.js converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter).

Conversion flags typically include:

- `input_format=tf_saved_model`  
- `output_format=tfjs_graph_model`  
- `weight_shard_size_bytes=XXXX`

The converter exports:

- **model.json** → model architecture  
- **group1-shard1ofN.bin** → model weights

⚠️ `tfjs-react-native` only supports **one shard file**, so you must set a large `weight_shard_size_bytes` to force the converter to produce only one `.bin` file. Pre-trained JS models on TF Hub usually contain **multiple shard files**, so they cannot be used directly in React Native.

## Deployment in React Native

First, place the model files in the local file system for offline access.

Then create a **Camera component** in React Native. It handles:

- `takePicture()` → capture and preprocess images  
- `callModelPrediction()` → run the model

### Preprocessing Flow

Using **RNCamera**, capture an image, then process it to match model requirements:

Typical MobileNet V2 input:
- Shape: **1 × 224 × 224 × 3**
- Datatype: **float32**
- Encoding: **tensor**
- Pixel range: **[0, 1]**

Steps:
1. Crop to **224×224×3** using `ImageEditor`
2. Convert Base64 → `Uint8Array` → Tensor
3. Normalise pixel values `[0–255] → [0–1]`
4. Convert datatype to **float32**

Now the input is valid:
**Tensor shape: [1, 224, 224, 3], float32, pixel range [0, 1]**

Now this processed image can be used as the input to the model for making a prediction. There are no complicated processing steps in this step. Just remember the most important thing : Model calling method should match the model converter process, which means, we should use **tf.loadGraphModel**to call the model because we have converted the model tf_saved_model to model tfjs_graph_model.

The results will be given after 5 or 10 seconds. The output is an array which represents each possibility for each class of objects in the customised dataset we provided. We can extract the maximum possibility and its index to do further processing, for example, comparing with the database to find the corresponding product name.

## Demo

In the end I would like to show you the demo I made for my internship project back to 2020. It can identify 14 different products offline. Accuracy depends heavily on the dataset and shooting angle. Still, it was an encouraging and educational experiment in applying machine learning to mobile applications.

You can find example scripts on GitHub: <https://github.com/diancici/APP-React-Native-Build-with-TensorFlow-.git>

You can also find a Video Demo on my YouTube channel: <https://www.youtube.com/embed/dNqdTC97NVM>

Have fun!












