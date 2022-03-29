# @dawi/react-native-zoom-us

zoom meeting sdk bridge

## Installation

```sh
npm install rn-native-zoom-us
```

## Ios Only Now Soon Android too

1- Make sure you have appropriate description in ```Info.plist```;

```
<key>NSBluetoothPeripheralUsageDescription</key>
<string>We will use your Bluetooth to access your Bluetooth headphones.</string>
	
<key>NSCameraUsageDescription</key>
<string>For people to see you during meetings, we need access to your camera.</string>
	
<key>NSMicrophoneUsageDescription</key>
<string>For people to hear you during meetings, we need access to your microphone.</string>
	
<key>NSPhotoLibraryUsageDescription</key>
<string>For people to share, we need access to your photos.</string>

```

2- Update pods using npx pod-install

3-  Make sure to set ``` ENABLE_BITCODE = NO; ```


## Usage

```js
import ReactNativeZoomUs from "rn-native-zoom-us;

// ...

  const steupSdk = async () => await ReactNativeZoomUs.initialize({jwtToken:"jwt"})

  
  const startMeetingasHost = async ()=> ReactNativeZoomUs.startMeeting({
      userName: 'dawi',
      meetingNumber: `meeting uid`,
      userId: data?.user_zoom_id,
      zoomAccessToken: data?.zoom_zak_token,
    });

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
