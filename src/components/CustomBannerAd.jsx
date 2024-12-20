import { useRef } from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-5549683451413930/4245344290';

const CustomBannerAd = () => {
    const bannerRef = useRef(null);

  return (
    <>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </>
  );
};

export default CustomBannerAd;
