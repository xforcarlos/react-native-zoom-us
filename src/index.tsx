import { NativeModules, NativeModulesStatic, Platform } from 'react-native';

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

const DEFAULT_USER_TYPE = 2;

type Language =
  | 'de'
  | 'ja'
  | 'en'
  | 'zh-Hant'
  | 'es'
  | 'zh-Hans'
  | 'it'
  | 'ko'
  | 'vi'
  | 'ru'
  | 'pt-PT'
  | 'fr';

const applyLanguageMapping = (language: Language): string => {
  const androidLanguageMapping: any = {
    'zh-Hans': 'zh-CN',
    'zh-Hant': 'zh-TW',
  };
  if (Platform.OS === 'android') {
    return androidLanguageMapping[language] || language;
  }

  return language;
};
interface RNZoomUsInitializeCommonParams {
  domain?: string;
  iosAppGroupId?: string;
  iosScreenShareExtensionId?: string;
}
export interface RNZoomUsInitializeParams
  extends RNZoomUsInitializeCommonParams {
  clientKey: string;
  clientSecret: string;
}

export interface RNZoomUsSDKInitParams extends RNZoomUsInitializeCommonParams {
  jwtToken: string;
  // we don't care for the rest, for now
}

type InitializeSettings = {
  language?: Language;
  enableCustomizedMeetingUI?: boolean;
  disableShowVideoPreviewWhenJoinMeeting?: boolean;
};

async function initialize(
  {
    domain = 'zoom.us',
    ...params
  }: RNZoomUsInitializeParams | RNZoomUsSDKInitParams,
  {
    language = 'en',
    enableCustomizedMeetingUI = false,

    // ios only
    disableShowVideoPreviewWhenJoinMeeting = true,
  }: InitializeSettings = {}
): Promise<string> {
  if ('jwtToken' in params) {
    // invariant(params.jwtToken, 'ZoomUs.initialize requires jwtToken');
  } else {
    // invariant(params.clientKey, 'ZoomUs.initialize requires clientKey');
    // invariant(params.clientSecret, 'ZoomUs.initialize requires clientSecret');
  }

  const mappedSettings = {
    language: applyLanguageMapping(language),
    enableCustomizedMeetingUI,

    disableShowVideoPreviewWhenJoinMeeting,
  };

  const mappedParams = {
    domain,
    ...params,
  };
  console.log({ mappedParams }, { mappedSettings });
  return ReactNativeZoomUs.initialize(mappedParams, mappedSettings);
}

function isInitialized(): Promise<boolean> {
  return ReactNativeZoomUs.isInitialized();
}

export interface RNZoomUsJoinMeetingParams {
  userName: string;
  meetingNumber: string | number;
  password?: string;
  autoConnectAudio?: boolean;
  noAudio?: boolean;
  noVideo?: boolean;

  noButtonLeave?: boolean;
  noButtonMore?: boolean;
  noButtonParticipants?: boolean;
  noButtonShare?: boolean;
  noTextMeetingId?: boolean;
  noTextPassword?: boolean;
  webinarToken?: string;

  // android only fields:
  noInvite?: boolean;
  noBottomToolbar?: boolean;
  noPhoneDialIn?: boolean;
  noPhoneDialOut?: boolean;
  noMeetingEndMessage?: boolean;
  noMeetingErrorMessage?: boolean;
  noShare?: boolean;
  noTitlebar?: boolean;
  noDrivingMode?: boolean;
  noDisconnectAudio?: boolean;
  noRecord?: boolean;
  noUnmuteConfirmDialog?: boolean;
  noWebinarRegisterDialog?: boolean;
  noChatMsgToast?: boolean;

  // ios only fields:
  zoomAccessToken?: string;
}
async function joinMeeting(params: RNZoomUsJoinMeetingParams) {
  let {
    meetingNumber,
    noAudio = false,
    noVideo = false,
    autoConnectAudio = false,
  } = params;
  // invariant(meetingNumber, 'ZoomUs.joinMeeting requires meetingNumber');
  if (typeof meetingNumber !== 'string')
    meetingNumber = meetingNumber.toString();

  // without noAudio, noVideo fields SDK can stack on joining meeting room for release build
  return ReactNativeZoomUs.joinMeeting({
    ...params,
    meetingNumber,
    noAudio: !!noAudio, // required
    noVideo: !!noVideo, // required
    autoConnectAudio, // required
  });
}

async function joinMeetingWithPassword(
  userName: RNZoomUsJoinMeetingParams['userName'],
  meetingNumber: NonNullable<RNZoomUsJoinMeetingParams['meetingNumber']>,
  password: NonNullable<RNZoomUsJoinMeetingParams['password']>
) {
  console.warn(
    "ZoomUs.joinMeetingWithPassword is deprecated. Use joinMeeting({ password: 'xxx', ... })"
  );
  return joinMeeting({
    userName,
    meetingNumber,
    password,
  });
}

export interface RNZoomUsStartMeetingParams {
  userName: string;
  meetingNumber: string | number;
  userId: string;
  userType?: number; // looks like can be different for IOS and Android
  zoomAccessToken: string;

  // android only fields:
  noInvite?: boolean;
  noShare?: boolean;

  noButtonLeave?: boolean;
  noButtonMore?: boolean;
  noButtonParticipants?: boolean;
  noButtonShare?: boolean;
  noTextMeetingId?: boolean;
  noTextPassword?: boolean;
}
async function startMeeting(params: RNZoomUsStartMeetingParams) {
  let { userType = DEFAULT_USER_TYPE, meetingNumber } = params;

  // invariant(meetingNumber, 'ZoomUs.startMeeting requires meetingNumber');
  if (typeof meetingNumber !== 'string')
    meetingNumber = meetingNumber.toString();

  return ReactNativeZoomUs.startMeeting({ userType, ...params, meetingNumber });
}

async function leaveMeeting() {
  return ReactNativeZoomUs.leaveMeeting();
}

async function connectAudio() {
  return ReactNativeZoomUs.connectAudio();
}

async function isMeetingConnected() {
  return ReactNativeZoomUs.isMeetingConnected();
}

async function isMeetingHost() {
  return ReactNativeZoomUs.isMeetingHost();
}

async function getInMeetingUserIdList() {
  return ReactNativeZoomUs.getInMeetingUserIdList();
}

async function rotateMyVideo(rotation: number) {
  if (Platform.OS === 'android') {
    return ReactNativeZoomUs.rotateMyVideo(rotation);
  } else {
    throw new Error('Only support android');
  }
}

async function muteMyVideo(muted: boolean) {
  return ReactNativeZoomUs.muteMyVideo(muted);
}

async function muteMyAudio(muted: boolean) {
  return ReactNativeZoomUs.muteMyAudio(muted);
}

async function muteAttendee(userId: string, muted: boolean) {
  return ReactNativeZoomUs.muteAttendee(userId, muted);
}

async function muteAllAttendee(allowUnmuteSelf: boolean) {
  return ReactNativeZoomUs.muteAllAttendee(allowUnmuteSelf);
}

async function startShareScreen() {
  return ReactNativeZoomUs.startShareScreen();
}

async function stopShareScreen() {
  return ReactNativeZoomUs.stopShareScreen();
}

async function switchCamera() {
  return ReactNativeZoomUs.switchCamera();
}

async function raiseMyHand() {
  return ReactNativeZoomUs.raiseMyHand();
}

async function lowerMyHand() {
  return ReactNativeZoomUs.lowerMyHand();
}

export const ZoomEmitter = ReactNativeZoomUs as NativeModulesStatic;

export default {
  initialize,
  joinMeeting,
  joinMeetingWithPassword,
  startMeeting,
  leaveMeeting,
  connectAudio,
  isInitialized,
  isMeetingHost,
  isMeetingConnected,
  getInMeetingUserIdList,
  rotateMyVideo,
  muteMyVideo,
  muteMyAudio,
  muteAttendee,
  muteAllAttendee,
  startShareScreen,
  stopShareScreen,
  switchCamera,
  raiseMyHand,
  lowerMyHand,
};
