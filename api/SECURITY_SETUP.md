# Security Setup

## Environment Variables

This API uses environment variables to securely store Firebase credentials. The sensitive `permission.json` file has been replaced with environment variables.

## Setup Instructions

1. **Install dependencies** (including dotenv):
   ```bash
   npm install
   ```

2. **Create a `.env` file** in the `api` directory with your Firebase service account credentials:
   ```bash
   cp .env.example .env
   ```

3. **Fill in the values** in `.env` with your actual Firebase credentials.

4. **Never commit** the `.env` file or `permission.json` to version control. These are already in `.gitignore`.

## Important Notes

- The `.env` file is already in `.gitignore` and will not be committed
- The `permission.json` file should be deleted or kept only locally (also in `.gitignore`)
- Share credentials securely with team members (not via Git)
- After updating `.env`, restart the server for changes to take effect
