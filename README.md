# ranalds.gift 2.0

This repository is for the community website [ranalds.gift](https://ranalds.gift) for Warhammer Vermintide 2. This website is for players to create, save and share their builds with other members of the community.

Below are instructions on how to setup the project for local development.

# Project Setup

1. Clone the dev branch of the repository
2. Run "npm install" from the terminal
3. Copy the "sample.env" and rename it to ".env"

# Supabase Setup

1. Run "npx supabase init" from the terminal
2. Run "npx supabase start" from the terminal
3. Take note of the status information, you will use it in the next section to setup the environment variables.

# Environment variables

1. Open the ".env" file in the root of the project
2. Update the PUBLIC_SUPABASE_ANON_KEY with the key from your local supabase instance
3. Update the PRIVATE_SUPABASE_SERVICE_ROLE_KEY with the key from your local supabase instance
4. Update the PRIVATE_DATABASE_AUTHORIZATION_BYPASS_KEY to be any unique string, preferably some UUID

# Prepare the database

1. Set the PRIVATE_INITIALIZE_DB flag in the ".env" file to "true"
2. Run "npm run dev" from the terminal
3. Open your local instance (default: http://localhost:5173)
4. Set the PRIVATE_INITIALIZE_DB flag in the ".env" file to "false" once the database has been initialized