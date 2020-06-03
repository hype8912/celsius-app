package network.celsius.wallet;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*;
import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "celsius";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);

      // get the root view and activate touch filtering to prevent tap jacking
      View v = findViewById(android.R.id.content);
      v.getRootView().setBackgroundColor(Color.parseColor("#4156A6"));
      v.setFilterTouchesWhenObscured(true);
      getWindow().getDecorView().setBackgroundColor(Color.parseColor("#4156A6"));
  }


  @Override
  protected void onStart() {
      super.onStart();
      RNBranchModule.initSession(getIntent().getData(), this);
  }

  @Override
  public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      setIntent(intent);
  }
}
