#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// https://docs.expo.dev/bare/installing-unimodules/
#import <UMCore/UMAppDelegateWrapper.h>

@interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
