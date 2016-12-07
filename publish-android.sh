#https://ionicframework.com/docs/guide/publishing.html
#tim54p4MS

APK_OUTPUT="./platforms/android/build/outputs/apk/android-release-unsigned.apk"
KEYSTORE="/home/nigel/dev/keystores/mrspice-release-key.keystore"
SIGNED_NAME="mrspice-release.apk"

rm -f $SIGNED_NAME
cordova build --release android \
&& jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE $APK_OUTPUT mrspice \
&& zipalign -v 4 $APK_OUTPUT $SIGNED_NAME
