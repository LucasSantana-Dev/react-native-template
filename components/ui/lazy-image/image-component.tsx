/**
 * Image component for LazyImage
 */

import { Image, ImageErrorEvent, ImageLoadEvent, ImageProps, ImageStyle } from 'react-native';

interface ImageComponentProps {
  source: ImageProps['source'];
  style?: ImageStyle;
  onLoad?: (event: ImageLoadEvent) => void;
  onError?: (event: ImageErrorEvent) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  resizeMode?: ImageProps['resizeMode'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

/**
 * Render image component
 */
export const renderImageComponent = ({
  source,
  style,
  onLoad,
  onError,
  onLoadStart,
  onLoadEnd,
  resizeMode,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: ImageComponentProps) => {
  return (
    <Image
      source={source}
      style={style}
      onLoad={onLoad}
      onError={onError}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      resizeMode={resizeMode}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
    />
  );
};
