import {useCallback} from 'react';
import {Linking} from 'react-native';

export function useOpenInBrowser(url) {
  return useCallback(() => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log("Don't know how to open URI: " + url);
        return;
      }

      Linking.openURL(url);
    });
  }, [url]);
}
