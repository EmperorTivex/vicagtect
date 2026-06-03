# User Deletion and Data Integrity Fixes

This document outlines the changes made to resolve the issue where deleted users' login credentials and associated data persisted in the system.

## Changes Implemented

### 1. Frontend: Cascading Deletion in `AdminDashboard.jsx`
- **Batch Deletion**: Updated the `handleDelete` function to use a Firestore `writeBatch`. When an investor is deleted, the system now simultaneously deletes all associated records in the `transactions` collection.
- **Maintenance Tool**: Added a new **Maintenance** tab in the Admin Dashboard. This tool allows admins to:
  - Audit the database for "orphaned" transactions (records belonging to investors who no longer exist).
  - Perform a bulk cleanup of these orphaned records.
- **Enhanced UI**: The delete confirmation now explicitly informs the admin that all associated records will be removed.

### 2. Backend: Firebase Cloud Functions
- **Auth Cleanup**: Created a `functions` directory with a background trigger (`cleanupAuthOnInvestorDelete`). 
  - This function listens for deletions in the `investors` collection.
  - When an investor is deleted, it automatically uses the Firebase Admin SDK to delete the corresponding user account from **Firebase Authentication**.
  - This ensures that password hashes, session tokens, and refresh tokens are fully purged.

## How to Prevent Future Issues

### Database Relationships
- **Always Use UID/ID Links**: When creating new features that link data to users, always store the user's `uid` or the parent document `id` in the child records.
- **Implement Cascading Logic**:
  - **Client-side**: Use `writeBatch` for operations that involve multiple related documents.
  - **Server-side (Recommended)**: Use Firestore Triggers (Cloud Functions) for cleanup. This is more reliable as it works regardless of where the deletion was initiated (web, mobile, or Firebase Console).

### Authentication Records
- **Admin SDK Requirement**: Remember that the Firebase Client SDK cannot delete other users' Auth accounts. All administrative user deletions **must** be paired with a backend process or Cloud Function using `firebase-admin`.

### Verification
- After adding new collections, update the `Maintenance` tab in the Admin Dashboard to include checks for orphans in the new collection.

## Deployment Steps for Admin
1. Navigate to the `functions` directory.
2. Run `npm install`.
3. Run `firebase deploy --only functions` to activate the automatic Auth cleanup.
