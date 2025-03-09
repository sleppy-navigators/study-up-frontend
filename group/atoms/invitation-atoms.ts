import { atom } from 'jotai';

export const isInvitationModalOpenAtom = atom(false);
export const invitationGroupIdAtom = atom<string | null>(null);

export const invitationModalStateAtom = atom(
  (get) => ({
    isOpen: get(isInvitationModalOpenAtom),
    groupId: get(invitationGroupIdAtom),
  }),
  (get, set, { isOpen, groupId }: { isOpen: boolean; groupId?: string }) => {
    set(isInvitationModalOpenAtom, isOpen);
    if (groupId !== undefined) {
      set(invitationGroupIdAtom, groupId);
    }
  }
);
