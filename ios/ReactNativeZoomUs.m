#import "ReactNativeZoomUs.h"

@implementation ReactNativeZoomUs

{
  BOOL isInitialized;
  BOOL shouldAutoConnectAudio;
  BOOL hasObservers;
  RCTPromiseResolveBlock initializePromiseResolve;
  RCTPromiseRejectBlock initializePromiseReject;
  RCTPromiseResolveBlock meetingPromiseResolve;
  RCTPromiseRejectBlock meetingPromiseReject;
  // If screenShareExtension is set, the Share Content > Screen option will automatically be
  // enabled in the UI
  NSString *screenShareExtension;

  NSString *jwtToken;
}
- (instancetype)init {
  if (self = [super init]) {
    isInitialized = NO;
    initializePromiseResolve = nil;
    initializePromiseReject = nil;
    shouldAutoConnectAudio = nil;
    meetingPromiseResolve = nil;
    meetingPromiseReject = nil;
    screenShareExtension = nil;
    jwtToken = nil;
  }
  return self;
}

RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(nonnull NSNumber*)a withB:(nonnull NSNumber*)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @([a floatValue] * [b floatValue]);

  resolve(result);
}

RCT_EXPORT_METHOD(initZoom:(NSString *)jwtToken
                  domain:(NSString *)domain
                  resolve: (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject)
{
  if (isInitialized) {
    resolve(@"Already initialize Zoom SDK successfully.");
    return;
  }

  
  MobileRTCSDKInitContext* initContext = [[MobileRTCSDKInitContext alloc] init];
  initContext.domain = @"https://zoom.us";
  // Set your Apple AppGroupID here
  initContext.appGroupId = @"com.ouredu.net";
  // Turn on SDK logging
  initContext.enableLog = YES;
  initContext.locale = MobileRTC_ZoomLocale_Default;
  if ([[MobileRTC sharedRTC] initialize:initContext]) {
      MobileRTCAuthService *authService = [[MobileRTC sharedRTC] getAuthService];
      if (authService) {
        @try {
          authService.jwtToken = jwtToken;
          authService.delegate = self;
          [authService sdkAuth];
          isInitialized = true;
          resolve(@" initialize Zoom SDK successfully.");
        } @catch (NSException *exception) {
          NSLog(@"%@", jwtToken);
        }
      }
  }

}

- (void)onMobileRTCAuthReturn:(MobileRTCAuthError)returnValue {
    switch (returnValue) {
        case MobileRTCAuthError_Success:
            NSLog(@"SDK successfully initialized.");
            break;
        case MobileRTCAuthError_KeyOrSecretEmpty:
            NSLog(@"SDK key/secret was not provided. Replace sdkKey and sdkSecret at the top of this file with your SDK key/secret.");
            break;
        case MobileRTCAuthError_KeyOrSecretWrong:
            NSLog(@"SDK key/secret is not valid.");
            break;
        case MobileRTCAuthError_Unknown:
            NSLog(@"SDK key/secret is not valid.");
            break;
        default:
            NSLog(@"SDK Authorization failed with MobileRTCAuthError: %u", returnValue);
    }
}

RCT_EXPORT_METHOD(
  startMeeting: (NSDictionary *)data
  withResolve: (RCTPromiseResolveBlock)resolve
  withReject: (RCTPromiseRejectBlock)reject
)
{
    NSLog(@"%@", data[@"userName"]);
    NSLog(@"%@", data[@"meetingNumber"]);
    NSLog(@"%@", data[@"userId"]);
    NSLog(@"%@", data[@"zoomAccessToken"]);
  @try {
    MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
    if (ms) {
      ms.delegate = self;
      

      MobileRTCMeetingStartParam4WithoutLoginUser * params = [[MobileRTCMeetingStartParam4WithoutLoginUser alloc]init];
      params.userName = data[@"userName"];
      params.meetingNumber = data[@"meetingNumber"];
      params.userID = data[@"userId"];
      params.userType = 99;
      params.zak = data[@"zoomAccessToken"];
      MobileRTCMeetError startMeetingResult = [ms startMeetingWithStartParam:params];
      NSLog(@"startMeeting, startMeetingResult=%lu", startMeetingResult);
    }
  } @catch (NSError *ex) {
      reject(@"ERR_UNEXPECTED_EXCEPTION", @"Executing startMeeting", ex);
  }
}


// TODO - neccesary
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
