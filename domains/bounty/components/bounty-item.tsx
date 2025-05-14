import { Avatar, Button, H4, Paragraph, XStack, YStack } from 'tamagui';

export interface BountyItemProps {
  imageUrl: string;
  name: string;
  description: string;
  amount: number;
  onClaim: () => void;
}

export function BountyItem({
  imageUrl,
  name,
  description,
  amount,
  onClaim,
}: BountyItemProps) {
  return (
    <XStack padding="$3" alignItems="center" gap="$3">
      <Avatar circular size="$4">
        <Avatar.Image src={imageUrl} />
        <Avatar.Fallback backgroundColor="$gray5" />
      </Avatar>

      <YStack flex={1} gap="$1">
        <H4 fontWeight="bold">{name}</H4>
        <Paragraph theme="alt2" size="$2">
          {description}
        </Paragraph>
        <Paragraph fontWeight="bold" marginTop="$1">
          {amount.toLocaleString()}원
        </Paragraph>
      </YStack>

      <Button
        themeInverse
        backgroundColor="$orange9"
        borderRadius="$4"
        size="$3"
        onPress={onClaim}>
        수령하기
      </Button>
    </XStack>
  );
}
