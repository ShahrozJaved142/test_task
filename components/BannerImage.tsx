// import React from 'react';
// import {
//     StyleSheet,
//     View,
//     Image
// } from 'react-native';

// import { deviceHeight, deviceWidth, useInsets } from '../utils/appDimensions';
// import appColors from '../utils/appColors';
// import { BannerImages } from '../assets/images';
// import { BannerKeys } from '../assets/images/models';

// interface BannerImageProps {
//     imageSource: BannerKeys
// }

// const BannerImage: React.FC<BannerImageProps> = ({
//     imageSource
// }) => {
//     const { top } = useInsets()
//     return (
//         <View style={[styles.container, { paddingTop: top }]}>
//             <Image
//                 source={BannerImages[imageSource]}
//                 style={styles.imageStyle}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 30,
//         width: '100%',
//         paddingBottom: 50,
//         height: deviceHeight / 2,
//         backgroundColor: appColors.gray,
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//     },
//     imageStyle: {
//         width: "100%",
//         height: "100%",
//     }
// });

// export default BannerImage;
