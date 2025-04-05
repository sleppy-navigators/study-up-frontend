import { useState, useEffect } from 'react';
import {
  Stack,
  YStack,
  XStack,
  Button,
  Text,
  Heading,
  Input,
  Theme,
  Image,
} from 'tamagui';
import { useRouter } from 'expo-router';
import { ArrowLeft } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';
import { useGetPreSignedUploadUrl } from '../../media/api';
import { useCompleteTask } from '../../challenge/api';
import ky from 'ky';

interface CertificationPageProps {
  challengeId: string;
  taskId: string;
}

export function CertificationPage({
  challengeId,
  taskId,
}: CertificationPageProps) {
  const router = useRouter();
  const [certificationMethod, setCertificationMethod] = useState<
    'photo' | 'link' | null
  >(null);
  const [link, setLink] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // API hooks
  const getUploadUrl = useGetPreSignedUploadUrl();
  const completeTask = useCompleteTask();

  // Camera permission handling
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (certificationMethod === 'photo' && status === null) {
      requestPermission();
    }
  }, [certificationMethod, status, requestPermission]);

  // Navigation handler
  const handleGoBack = () => {
    router.back();
  };

  // Take photo handler
  const handleTakePhoto = async () => {
    try {
      // Request camera permission if not granted
      if (!status?.granted) {
        const permissionResult = await requestPermission();
        if (!permissionResult.granted) {
          setErrorMessage('카메라 권한이 필요합니다.');
          return;
        }
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage('사진 촬영 중 오류가 발생했습니다.');
      console.error('Error taking photo:', error);
    }
  };

  // Submit photo handler
  const handleSubmitPhoto = async () => {
    if (!image) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      // Generate a unique filename
      const filename = `task-certification-${Date.now()}.jpg`;

      // Get pre-signed URL using mutation
      const uploadUrlData = await getUploadUrl.mutateAsync(filename);

      if (!uploadUrlData) {
        throw new Error('URL 발급에 실패했습니다.');
      }

      // Upload image to pre-signed URL using ky
      try {
        await ky.put(uploadUrlData.url, {
          body: await fetchImageData(image),
          headers: {
            'Content-Type': 'image/jpeg',
          },
        });
      } catch (_uploadError) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      // Complete task with image URL using mutation
      await completeTask.mutateAsync({
        challengeId: Number(challengeId),
        taskId: Number(taskId),
        data: {
          imageUrls: [uploadUrlData.url],
          externalLinks: [],
        },
      });

      // Navigate back on success
      router.back();
    } catch (error) {
      setErrorMessage(
        '인증 실패: ' +
          (error instanceof Error ? error.message : '알 수 없는 오류')
      );
      console.error('Error submitting photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to fetch image data
  const fetchImageData = async (uri: string) => {
    const response = await ky.get(uri);
    return await response.blob();
  };

  // Submit link handler
  const handleSubmitLink = async () => {
    if (!link.trim()) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      // Complete task with external link using mutation
      await completeTask.mutateAsync({
        challengeId: Number(challengeId),
        taskId: Number(taskId),
        data: {
          imageUrls: [],
          externalLinks: [link.trim()],
        },
      });

      // Navigate back on success
      router.back();
    } catch (error) {
      setErrorMessage(
        '인증 실패: ' +
          (error instanceof Error ? error.message : '알 수 없는 오류')
      );
      console.error('Error submitting link:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Render different content based on selected certification method
  const renderCertificationContent = () => {
    if (certificationMethod === 'photo') {
      return (
        <YStack space="$4" flex={1} padding="$4">
          <Heading>사진 촬영하여 인증하기</Heading>

          {image ? (
            <YStack
              flex={1}
              justifyContent="center"
              alignItems="center"
              space="$4">
              <Image
                source={{ uri: image }}
                width={300}
                height={300}
                borderRadius="$4"
                resizeMode="cover"
              />
              <XStack space="$4">
                <Button
                  size="$4"
                  theme="alt2"
                  onPress={() => setImage(null)}
                  disabled={isUploading}>
                  다시 찍기
                </Button>
                <Button
                  size="$4"
                  theme="accent"
                  onPress={handleSubmitPhoto}
                  disabled={isUploading}>
                  {isUploading ? (
                    <XStack space="$2">
                      <ActivityIndicator color="white" />
                      <Text>업로드 중...</Text>
                    </XStack>
                  ) : (
                    '제출하기'
                  )}
                </Button>
              </XStack>
            </YStack>
          ) : (
            <YStack
              flex={1}
              justifyContent="center"
              alignItems="center"
              space="$4">
              <Button
                size="$6"
                theme="accent"
                onPress={handleTakePhoto}
                disabled={isUploading}>
                사진 촬영하기
              </Button>
              <Button
                size="$4"
                theme="alt2"
                onPress={() => setCertificationMethod(null)}
                disabled={isUploading}>
                뒤로 가기
              </Button>
            </YStack>
          )}

          {errorMessage && (
            <Text color="$red10" textAlign="center">
              {errorMessage}
            </Text>
          )}
        </YStack>
      );
    } else if (certificationMethod === 'link') {
      return (
        <YStack space="$4" flex={1} padding="$4">
          <Heading>링크 공유하여 인증하기</Heading>
          <Input
            size="$4"
            placeholder="인증 링크를 입력해주세요"
            value={link}
            onChangeText={setLink}
            disabled={isUploading}
          />
          <XStack space="$4" justifyContent="center">
            <Button
              theme="alt2"
              onPress={() => setCertificationMethod(null)}
              disabled={isUploading}>
              뒤로 가기
            </Button>
            <Button
              theme="accent"
              disabled={!link.trim() || isUploading}
              onPress={handleSubmitLink}>
              {isUploading ? (
                <XStack space="$2">
                  <ActivityIndicator color="white" />
                  <Text>제출 중...</Text>
                </XStack>
              ) : (
                '제출하기'
              )}
            </Button>
          </XStack>

          {errorMessage && (
            <Text color="$red10" textAlign="center">
              {errorMessage}
            </Text>
          )}
        </YStack>
      );
    }

    // Default: show certification method selection
    return (
      <YStack space="$6" flex={1} padding="$4" justifyContent="center">
        <Button
          size="$6"
          theme="accent"
          onPress={() => setCertificationMethod('photo')}>
          사진 찍어서 인증하기
        </Button>
        <Button
          size="$6"
          theme="accent"
          variant="outlined"
          onPress={() => setCertificationMethod('link')}>
          링크 공유하여 인증하기
        </Button>
      </YStack>
    );
  };

  return (
    <Theme name="accent">
      <Stack flex={1}>
        <YStack flex={1}>
          {/* Header with back button */}
          <XStack
            height="$6"
            paddingHorizontal="$4"
            alignItems="center"
            backgroundColor="$background">
            <Button
              size="$4"
              circular
              icon={<ArrowLeft size="$1" />}
              onPress={handleGoBack}
            />
            <Text flex={1} textAlign="center" fontSize="$6" fontWeight="bold">
              태스크 인증하기
            </Text>
            <Button size="$4" circular transparent disabled />
          </XStack>

          {/* Main content */}
          {renderCertificationContent()}
        </YStack>
      </Stack>
    </Theme>
  );
}
