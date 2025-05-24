import { useState, useEffect } from 'react';
import { Button, Input, Text, XStack, YStack } from 'tamagui';
import { Trash2, Calendar } from '@tamagui/lucide-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export interface TaskItemProps {
  index: number;
  title: string;
  deadline: Date;
  onTitleChange: (index: number, title: string) => void;
  onDeadlineChange: (index: number, deadline: Date) => void;
  onRemove: (index: number) => void;
  maxDeadline?: Date;
  disabled?: boolean;
}

export function TaskItem({
  index,
  title,
  deadline,
  onTitleChange,
  onDeadlineChange,
  onRemove,
  maxDeadline,
  disabled = false,
}: TaskItemProps) {
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Validate title length whenever it changes
  useEffect(() => {
    if (title.length > 20) {
      setError('테스크 제목은 20자 이내로 입력해주세요');
    } else {
      setError(null);
    }
  }, [title]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle date change
  const handleDateChange = (_: any, selectedDate?: Date) => {
    // Hide the picker for Android (iOS will close automatically)
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      // Ensure the selected date doesn't exceed max deadline
      if (maxDeadline && selectedDate > maxDeadline) {
        onDeadlineChange(index, maxDeadline);
      } else {
        onDeadlineChange(index, selectedDate);
      }
    }
  };

  return (
    <YStack space="$2" mb="$4">
      <XStack space="$2" alignItems="center">
        <YStack flex={1}>
          <Text fontWeight="bold">테스크 {index + 1}</Text>
          <Input
            size="$4"
            placeholder="테스크 제목"
            value={title}
            onChangeText={(text) => onTitleChange(index, text)}
            disabled={disabled}
            borderWidth={error ? 1 : 0}
            borderColor={error ? '$red8' : 'transparent'}
            backgroundColor="$gray2"
            focusStyle={{
              backgroundColor: '$gray1',
              borderWidth: 0,
            }}
          />
          {error && (
            <Text color="$red10" fontSize="$2" ml="$1">
              {error}
            </Text>
          )}
        </YStack>

        <Button
          size="$3"
          circular
          backgroundColor="$red9"
          onPress={() => onRemove(index)}
          disabled={disabled}
          alignSelf="flex-start"
          mt="$3">
          <Trash2 size="$1" color="white" />
        </Button>
      </XStack>

      <YStack>
        <Text fontWeight="bold">마감일</Text>
        <Button
          size="$4"
          backgroundColor="$gray2"
          borderWidth={0}
          alignItems="flex-start"
          justifyContent="flex-start"
          disabled={disabled}
          onPress={() => setShowDatePicker(true)}
          icon={<Calendar size="$1" color="$gray11" />}>
          <Text>{formatDate(deadline)}</Text>
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display="default"
            onChange={handleDateChange}
            disabled={disabled}
          />
        )}
      </YStack>
    </YStack>
  );
}
