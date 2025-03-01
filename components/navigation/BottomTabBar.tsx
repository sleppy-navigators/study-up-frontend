import { XStack, styled } from 'tamagui';
import { Home, Users, User } from '@tamagui/lucide-icons';

const TabButton = styled(XStack, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: '$medium',

  variants: {
    active: {
      true: {
        color: '$primary',
      },
      false: {
        color: '$text',
      },
    },
  } as const,
});

interface TabBarProps {
  currentTab: string;
  onTabPress: (tabName: string) => void;
}

export const BottomTabBar = ({ currentTab, onTabPress }: TabBarProps) => {
  return (
    <XStack
      borderTopWidth={1}
      borderTopColor="$gray800"
      backgroundColor="$background">
      <TabButton
        active={currentTab === 'home'}
        onPress={() => onTabPress('home')}>
        <Home size={24} />
      </TabButton>
      <TabButton
        active={currentTab === 'community'}
        onPress={() => onTabPress('community')}>
        <Users size={24} />
      </TabButton>
      <TabButton
        active={currentTab === 'profile'}
        onPress={() => onTabPress('profile')}>
        <User size={24} />
      </TabButton>
    </XStack>
  );
};
