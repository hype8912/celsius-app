//
//  MRZExtraction.h
//  Onfido
//
//  Created by Anurag Ajwani on 14/08/2020.
//

#import <UIKit/UIKit.h>

@interface MRZExtraction : NSObject

- (id _Nonnull) init;
- (NSArray * _Nullable) extractFromImage: (UIImage * _Nonnull) image withThreshold: (int) threshold;

@end
