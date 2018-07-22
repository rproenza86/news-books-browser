import "@polymer/app-layout/app-drawer/app-drawer";
import { setPassiveTouchGestures } from "@polymer/polymer/lib/utils/settings";

// To force all event listeners for gestures to be passive.
// See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
setPassiveTouchGestures(true);
