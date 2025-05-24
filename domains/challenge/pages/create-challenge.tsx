import { useCallback, useState } from 'react';
import { ScrollView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Form,
  YStack,
  Text,
  Input,
  TextArea,
  Button,
  XStack,
  Spinner,
} from 'tamagui';
import { Calendar } from '@tamagui/lucide-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from '@/domains/base/components/header';
import { useCreateChallenge } from '@/domains/challenge/api';
import { Task, CreateChallengeFormData } from '../types';
import { TaskList } from '../components/task-list';

export default function CreateChallengePage() {
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const createChallenge = useCreateChallenge();
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateChallengeFormData>(() => {
    // Set default deadline to one week from now
    const defaultDeadline = new Date();
    defaultDeadline.setDate(defaultDeadline.getDate() + 7);

    return {
      title: '',
      deadline: defaultDeadline,
      description: '',
      tasks: [
        {
          title: '',
          deadline: defaultDeadline,
        },
      ],
    };
  });

  // Validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    tasks?: string;
  }>({});

  // Add a new task
  const handleAddTask = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          title: '',
          deadline: prev.deadline, // Default to challenge deadline
        },
      ],
    }));
  }, []);

  // Update a task
  const handleUpdateTask = useCallback((index: number, updatedTask: Task) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => (i === index ? updatedTask : task)),
    }));
  }, []);

  // Remove a task
  const handleRemoveTask = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  }, []);

  // Format date for display
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Handle date change
  const handleDateChange = useCallback((_: any, selectedDate?: Date) => {
    // Hide the picker for Android (iOS will close automatically)
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      // Update challenge deadline
      setFormData((prev) => {
        // If the new deadline is earlier than any task deadline, also adjust task deadlines
        const newTasks = prev.tasks.map((task) => {
          if (task.deadline > selectedDate) {
            return { ...task, deadline: selectedDate };
          }
          return task;
        });

        return {
          ...prev,
          deadline: selectedDate,
          tasks: newTasks,
        };
      });
    }
  }, []);

  // Validate form data
  const validateForm = useCallback(() => {
    const newErrors: {
      title?: string;
      tasks?: string;
    } = {};

    // Validate challenge title
    if (!formData.title.trim()) {
      newErrors.title = '챌린지 제목을 입력해주세요';
    } else if (formData.title.length > 20) {
      newErrors.title = '챌린지 제목은 20자 이내로 입력해주세요';
    }

    // Validate tasks
    if (formData.tasks.length === 0) {
      newErrors.tasks = '적어도 하나의 테스크를 추가해주세요';
    } else if (formData.tasks.some((task) => !task.title.trim())) {
      newErrors.tasks = '모든 테스크의 제목을 입력해주세요';
    } else if (formData.tasks.some((task) => task.title.length > 20)) {
      newErrors.tasks = '테스크 제목은 20자 이내로 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateForm() || !groupId) {
      return;
    }

    try {
      const numericGroupId = parseInt(groupId, 10);

      // Convert dates to ISO strings for API
      const apiData = {
        title: formData.title,
        deadline: formData.deadline.toISOString(),
        description: formData.description,
        tasks: formData.tasks.map((task) => ({
          title: task.title,
          deadline: task.deadline.toISOString(),
        })),
      };

      await createChallenge.mutateAsync({
        groupId: numericGroupId,
        data: apiData,
      });

      // Navigate back to group detail page
      router.back();
    } catch (error) {
      console.error('Failed to create challenge:', error);
    }
  }, [formData, groupId, validateForm, createChallenge, router]);

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="챌린지 생성" onBack={() => router.back()} />

      <ScrollView>
        <YStack padding="$4" space="$6">
          <Form onSubmit={handleSubmit}>
            <YStack space="$4">
              <YStack space="$2">
                <Text fontWeight="bold">챌린지 제목</Text>
                <Input
                  size="$4"
                  placeholder="챌린지 제목"
                  value={formData.title}
                  onChangeText={(title) => setFormData({ ...formData, title })}
                  borderWidth={errors.title ? 1 : 0}
                  borderColor={errors.title ? '$red8' : 'transparent'}
                  backgroundColor="$gray2"
                  focusStyle={{
                    backgroundColor: '$gray1',
                    borderWidth: 0,
                  }}
                />
                {errors.title && (
                  <Text color="$red10" fontSize="$2" ml="$1">
                    {errors.title}
                  </Text>
                )}
              </YStack>

              <YStack space="$2">
                <Text fontWeight="bold">챌린지 마감일</Text>
                <Button
                  size="$4"
                  backgroundColor="$gray2"
                  borderWidth={0}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  onPress={() => setShowDatePicker(true)}
                  icon={<Calendar size="$1" color="$gray11" />}>
                  <Text>{formatDate(formData.deadline)}</Text>
                </Button>

                {showDatePicker && (
                  <DateTimePicker
                    value={formData.deadline}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </YStack>

              <YStack space="$2">
                <Text fontWeight="bold">설명 (선택사항)</Text>
                <TextArea
                  size="$4"
                  placeholder="챌린지에 대한 설명을 입력하세요"
                  value={formData.description}
                  onChangeText={(description) =>
                    setFormData({ ...formData, description })
                  }
                  backgroundColor="$gray2"
                  focusStyle={{
                    backgroundColor: '$gray1',
                    borderWidth: 0,
                  }}
                  minHeight={100}
                />
              </YStack>

              <YStack space="$2">
                <TaskList
                  tasks={formData.tasks}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onRemoveTask={handleRemoveTask}
                  maxDeadline={formData.deadline}
                  disabled={createChallenge.isPending}
                />
                {errors.tasks && (
                  <Text color="$red10" fontSize="$2" ml="$1">
                    {errors.tasks}
                  </Text>
                )}
              </YStack>

              <Button
                themeInverse
                size="$4"
                onPress={handleSubmit}
                disabled={createChallenge.isPending}
                borderRadius="$4"
                height="$6"
                pressStyle={{ opacity: 0.9 }}
                mt="$4"
                backgroundColor="$yellow9">
                {createChallenge.isPending ? (
                  <XStack space="$2" alignItems="center">
                    <Spinner size="small" color="$color" />
                    <Text>생성 중...</Text>
                  </XStack>
                ) : (
                  '챌린지 생성하기'
                )}
              </Button>
            </YStack>
          </Form>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
