# Etherna Web

## Setup

```bash
mv .env.example .env
```

Change the settings in .env file (development):

```toml
PUBLIC_DIRECTUS_URL="http://localhost:8055"
DIRECTUS_TOKEN="xxxxxxxxxxx"
```

To create a new token, follow this steps:

- go to http://localhost:8055/admin/users

Change the settings in .env file (production):

```toml
PUBLIC_DIRECTUS_URL="http://localhost:8055"
DIRECTUS_TOKEN=""
```
