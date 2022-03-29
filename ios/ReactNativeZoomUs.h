#import <React/RCTBridgeModule.h>
#import <MobileRTC/MobileRTC.h>

@interface ReactNativeZoomUs : NSObject <RCTBridgeModule,MobileRTCMeetingServiceDelegate>

@property (nonatomic, copy) RCTPromiseResolveBlock initializePromiseResolve;
@property (nonatomic, copy) RCTPromiseRejectBlock initializePromiseReject;

@end
