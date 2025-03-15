import { useMutation } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { SuccessResponse } from '../../base/api/types';
import { UploadUrlResponse } from './types';

/**
 * Media Query Key Factory
 */
export const mediaKeys = {
  all: ['media'] as const,
  uploadUrl: () => [...mediaKeys.all, 'uploadUrl'] as const,
};

/**
 * Media API 함수
 */
export const mediaApi = {
  /**
   * S3 pre-signed URL 발급
   * @param filename 파일명
   * @returns 업로드 URL 응답
   */
  getPreSignedUploadUrl: (filename: string) =>
    client
      .post('media/upload-url', {
        searchParams: { filename },
      })
      .json<SuccessResponse<UploadUrlResponse>>()
      .then((res) => res.data),
};

/**
 * S3 pre-signed URL 발급 훅
 */
export function useGetPreSignedUploadUrl() {
  return useMutation<UploadUrlResponse, Error, string>({
    mutationFn: (filename) => mediaApi.getPreSignedUploadUrl(filename),
  });
}
