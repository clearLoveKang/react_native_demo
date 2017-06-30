package com.sbapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.yunpeng.alipay.AlipayPackage;
import com.imagepicker.ImagePickerPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.theweflex.react.WeChatPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.theweflex.react.WeChatPackage;// Add this line before public class MainActivity

import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AlipayPackage(),
            new ImagePickerPackage(),
            new SplashScreenReactPackage(),
            new WeChatPackage(),
          new VectorIconsPackage(),
          new BaiduMapPackage(getApplicationContext()),
          new WeChatPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
