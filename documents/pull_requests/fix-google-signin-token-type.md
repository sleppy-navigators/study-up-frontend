# Switch from Google OAuth to Firebase ID Token

## Description

Changes the authentication flow to use Firebase ID tokens instead of Google OAuth tokens. This ensures our backend receives tokens in the Firebase-specified format for proper authentication verification.

## Changes

- Modified `signInWithGoogle` to retrieve Firebase ID token after Google authentication
- Added Firebase credential creation and sign-in step
- Now returns Firebase ID token instead of Google OAuth token

## Testing

- Verified complete authentication flow with Firebase
- Confirmed proper token format for backend verification

## Related Issues

Switches from Google OAuth ID token to Firebase ID token format for backend compatibility
