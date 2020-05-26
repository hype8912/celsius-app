package network.celsius.wallet;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*;
import android.content.Intent;

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
      super.onCreate(savedInstanceState);

      // get the root view and activate touch filtering to prevent tap jacking
      View v = findViewById(android.R.id.content);
      v.setFilterTouchesWhenObscured(true);
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
