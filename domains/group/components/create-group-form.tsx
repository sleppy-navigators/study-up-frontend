import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  YStack,
  Text,
  XStack,
  Spinner,
  H2,
  Paragraph,
  TextArea,
} from 'tamagui';
import { Users } from '@tamagui/lucide-icons';

export interface CreateGroupFormProps {
  onSubmit: (groupName: string, description: string) => void;
  isLoading?: boolean;
}

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
}

export function CreateGroupForm({
  onSubmit,
  isLoading = false,
}: CreateGroupFormProps) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Validate group name
    if (!groupName.trim()) {
      setError('그룹 이름을 입력해주세요');
      return;
    }

    // Clear any previous errors
    setError(null);

    // Call the onSubmit callback with the group name and description
    onSubmit(groupName, description);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <YStack space="$6" width="100%">
        <YStack space="$2" alignItems="center">
          <XStack
            backgroundColor="$blue4"
            p="$3"
            borderRadius="$10"
            mb="$2"
            alignItems="center"
            justifyContent="center">
            <Users size="$4" color="$blue10" />
          </XStack>
          <H2 textAlign="center" mb="$1">
            새 그룹 만들기
          </H2>
          <Paragraph textAlign="center" theme="alt2" mb="$2">
            함께 공부할 그룹의 정보를 입력하세요
          </Paragraph>
        </YStack>

        <YStack space="$4">
          <YStack space="$2">
            <Text fontWeight="bold">그룹 이름</Text>
            <Input
              size="$4"
              placeholder="예: 알고리즘 스터디"
              value={groupName}
              onChangeText={setGroupName}
              autoFocus
              disabled={isLoading}
              borderWidth={error ? 1 : 0}
              borderColor={error ? '$red8' : 'transparent'}
              backgroundColor="$gray2"
              focusStyle={{
                backgroundColor: '$gray1',
                borderWidth: 0,
              }}
            />

            {error && (
              <Text color="$red10" fontSize="$3" ml="$1">
                {error}
              </Text>
            )}
          </YStack>

          <YStack space="$2">
            <Text fontWeight="bold">그룹 설명 (선택사항)</Text>
            <TextArea
              size="$4"
              placeholder="그룹에 대한 설명을 입력하세요"
              value={description}
              onChangeText={setDescription}
              disabled={isLoading}
              backgroundColor="$gray2"
              focusStyle={{
                backgroundColor: '$gray1',
                borderWidth: 0,
              }}
              minHeight={100}
            />
          </YStack>
        </YStack>

        <Button
          themeInverse
          size="$4"
          onPress={handleSubmit}
          disabled={isLoading}
          borderRadius="$4"
          height="$6"
          pressStyle={{ opacity: 0.9 }}
          mt="$2"
          backgroundColor="$yellow9">
          {isLoading ? (
            <XStack space="$2" alignItems="center">
              <Spinner size="small" color="$color" />
              <Text>생성 중...</Text>
            </XStack>
          ) : (
            '그룹 생성하기'
          )}
        </Button>
      </YStack>
    </Form>
  );
}
