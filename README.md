# @dawi/react-native-zoom-us

zoom meeting sdk bridge

## Installation

```sh
npm install @dawi/react-native-zoom-us
```

## Usage

```js
import { initZoom  , startMeeting} from "@dawi/react-native-zoom-us";

// ...

  const steupSdk = async () => await initZoom(init_sdk_jwt_token, 'zoom.us');

  
    await startMeeting({
      meetingNumber: "",
      zoomAccessToken:"",
      userId:"",
      userName: 'dawi',
      userType: 1,
    });

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
