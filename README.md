# ContactsList

Contacts List is React Native Project that simply reads and allows selection of a contact from iOS/Android Devices.

## Installation

Setup the React Native environment for both iOS and Android [react-native](https://reactnative.dev/docs/environment-setup)

Be assured of the different Versions used to debug any setup and execution issues

```bash
yarn 1.22.5
node 13.12.0
react-native 0.63.4
```

## Usage

After setting up the environments, clone the project and run at the root of the project:

```javascript
yarn
cd ios && pod install
cd ..
npx react-native run-ios
```
This will install all the required modules and pods for iOS and start the project in an iOS emulator

For running it on Android one can execute:

```javascript
npx react-native run-android
```

For tests:
```javascript
yarn test
```


## License
[MIT](https://choosealicense.com/licenses/mit/)