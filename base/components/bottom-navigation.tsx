import { Home, Users, User } from '@tamagui/lucide-icons';
import { Button, XStack } from 'tamagui';

export interface BottomNavigationProps {
  activeTab: 'home' | 'community' | 'profile';
  onTabChange: (tab: 'home' | 'community' | 'profile') => void;
}

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  return (
    <XStack
      height="$6"
      borderTopWidth="$0.5"
      borderColor="$borderColor"
      justifyContent="space-around"
      alignItems="center"
      backgroundColor="$background">
      <Button
        chromeless
        onPress={() => onTabChange('home')}
        flexDirection="column"
        alignItems="center"
        opacity={activeTab === 'home' ? 1 : 0.5}>
        <Home size="$1.5" />
      </Button>

      <Button
        chromeless
        onPress={() => onTabChange('community')}
        flexDirection="column"
        alignItems="center"
        opacity={activeTab === 'community' ? 1 : 0.5}>
        <Users size="$1.5" />
      </Button>

      <Button
        chromeless
        onPress={() => onTabChange('profile')}
        flexDirection="column"
        alignItems="center"
        opacity={activeTab === 'profile' ? 1 : 0.5}>
        <User size="$1.5" />
      </Button>
    </XStack>
  );
}
