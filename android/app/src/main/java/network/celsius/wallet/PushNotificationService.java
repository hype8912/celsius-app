package network.celsius.wallet;

import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingService;

import com.google.firebase.messaging.RemoteMessage;

import com.mixpanel.android.mpmetrics.MixpanelFCMMessagingService;

import android.util.Log;
import android.content.Intent;

import java.lang.Override;
import java.lang.String;

public class PushNotificationService extends ReactNativeFirebaseMessagingService {
    private static final String TAG = "PushNotificationService";

    @Override
    public void onNewToken(String newToken) {
        super.onNewToken(newToken);
        Log.d(TAG, "newToken: " + newToken);

        MixpanelFCMMessagingService.addToken(newToken);
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d(TAG, "onMessageReceived");
//        for (String s: remoteMessage.getData().keySet()) {
//            Log.d("Keys are: ", s);
//        }
//
//        for (String s: remoteMessage.getData().values()) {
//            Log.d("Values are: ", s);
//        }

        if (remoteMessage.getData().containsKey( "mp_message")) {
            Log.d(TAG, "onMessageReceived hasMpMessage");

            // Set default mixpanel push notification icon and colour
            Intent intent = remoteMessage.toIntent();
            intent.putExtra("mp_icnm", "ic_notification");
            intent.putExtra("mp_color", "#00FFFFFF");

            MixpanelFCMMessagingService.showPushNotification(getApplicationContext(), intent);
        }
    }
}
