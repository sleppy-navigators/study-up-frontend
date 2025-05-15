import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'tamagui';

const StyledSafeAreaView = styled(DefaultSafeAreaView, {
  flex: 1,
});

export default StyledSafeAreaView;
