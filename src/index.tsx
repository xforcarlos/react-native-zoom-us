import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@dawi/react-native-zoom-us' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ReactNativeZoomUs = NativeModules.ReactNativeZoomUs
  ? NativeModules.ReactNativeZoomUs
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

console.log('ReactNativeZoomUs', ReactNativeZoomUs);
console.log('getConstants', ReactNativeZoomUs.getConstants());
export function multiply(a: number, b: number): Promise<number> {
  return ReactNativeZoomUs.multiply(a, b);
}

export async function initZoom(
  jwtToken: string,
  domain: string
): Promise<void> {
  const response = await ReactNativeZoomUs.initZoom(jwtToken, domain);
  console.log('response', response);
}

interface StartMeetingType {
  userName: string;
  meetingNumber: string;
  userId: string;
  zoomAccessToken: string;
}

export async function startMeeting(data: StartMeetingType): Promise<void> {
  try {
    console.log('data', data);
    const response = await ReactNativeZoomUs.startMeeting({ ...data });
    console.log('response', response);
  } catch (error) {
    console.log('error', error);
  }
}
