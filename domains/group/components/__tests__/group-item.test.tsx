import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GroupItem } from '../group-item';
import { useRouter } from 'expo-router';

// useRouter 모킹
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('GroupItem', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    // 각 테스트 전에 모킹 초기화
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders correctly with required props', () => {
    const { getByText } = render(
      <GroupItem
        id={1}
        title="Test Group"
        description="Test Description"
        timestamp="1 hour ago"
      />
    );

    expect(getByText('Test Group')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('1 hour ago')).toBeTruthy();
  });

  it('navigates to group detail page when pressed', () => {
    const { getByText } = render(
      <GroupItem
        id={1}
        title="Test Group"
        description="Test Description"
        timestamp="1 hour ago"
      />
    );

    // 그룹 아이템 클릭
    fireEvent.press(getByText('Test Group'));

    // 라우터의 push 메서드가 올바른 경로로 호출되었는지 확인
    expect(mockRouter.push).toHaveBeenCalledWith('/group/1');
  });

  it('calls custom onPress handler when provided', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <GroupItem
        id={1}
        title="Test Group"
        description="Test Description"
        timestamp="1 hour ago"
        onPress={mockOnPress}
      />
    );

    // 그룹 아이템 클릭
    fireEvent.press(getByText('Test Group'));

    // 커스텀 onPress 핸들러가 호출되었는지 확인
    expect(mockOnPress).toHaveBeenCalled();
    // 라우터의 push 메서드는 호출되지 않았는지 확인
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
