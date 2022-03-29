#import <React/RCTBridgeModule.h>
#import <MobileRTC/MobileRTC.h>
#import "RCTEventEmitter.h"

@interface ReactNativeZoomUs : RCTEventEmitter <RCTBridgeModule, MobileRTCAuthDelegate, MobileRTCMeetingServiceDelegate, MobileRTCVideoServiceDelegate, MobileRTCAudioServiceDelegate, MobileRTCUserServiceDelegate>

@property (nonatomic, copy) RCTPromiseResolveBlock initializePromiseResolve;
@property (nonatomic, copy) RCTPromiseRejectBlock initializePromiseReject;

@end
