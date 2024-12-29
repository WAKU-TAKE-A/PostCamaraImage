# React Native Image Upload App

This is a simple "React Native + Expo" app that allows the user to take a photo using the camera, view the photo, and upload it to a server via HTTP POST. The app requests camera permissions, lets users take a photo, and then upload the photo to a specified URL.

## Features

- **Camera Access**: Requests camera permission to take photos.
- **Take a Photo**: Allows users to take a photo using the device camera.
- **Upload Image**: Uploads the captured image to a server using HTTP POST.
- **Custom Upload URL**: Allows the user to input a custom URL for the upload server.
- **Responsive Layout**: Adapts to different screen sizes (portrait and landscape modes).

## Prerequisites

- Node.js (version 16.x or higher)
- Expo CLI
- React Native development environment (can be set up via Expo)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/WAKU-TAKE-A/PostCamaraImage.git
    ```

2. Install dependencies:

    ```bash
    cd     git clone https://github.com/WAKU-TAKE-A/PostCamaraImage.git
    yarn install
    ```

    If Yarn is not installed, please follow these steps to install it:<br>
    Install Yarn using npm: Open your terminal and run the following command:

    ```bash
    npm install -g yarn
    ```

3. Start the app using Expo:

    ```bash
    yarn start
    ```

4. Scan the QR code with the Expo Go app on your mobile device or use an emulator.

## Usage

- Click on **Request Permissions** to request access to the camera.
- Click on **Open Camera** to launch the camera and take a photo.
- After taking a photo, it will be displayed on the screen.
- Enter the URL of the server to upload the image (default: `http://192.168.0.1:1880/postfile`).
- Click on **Upload** to upload the image to the specified server.
