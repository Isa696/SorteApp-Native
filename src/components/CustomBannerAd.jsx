import { useRef } from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = import.meta.env.VITE_GOOGLE_ADS_BANNER_ID;

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
