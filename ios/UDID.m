//
//  UDID.m
//  UDID
//
//  Created by Vlada Calic on 02/10/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "UDID.h"

@implementation UDID

RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(get,
                 getWithResolver:(RCTPromiseResolveBlock)resolve
                        rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *deviceId = [[[UIDevice currentDevice]identifierForVendor]UUIDString];
  if (deviceId) {
    resolve(deviceId);
  } else {
    NSString *shortMessage = @"No UDID";
    NSString *longMessage = @"Could not get device UDID.";
    NSError *error = [NSError errorWithDomain:@"UDID"
                                         code:500
                                     userInfo:@{
                                       NSLocalizedDescriptionKey: longMessage
                                     }];
    reject(shortMessage, longMessage , error);
  }
}

@end
