# Etherna CMS

## Setup

```bash
mv .env.example .env
```

Change the db settings in .env file. You can use postgres, mysql or sqlite:

```toml
DB_CLIENT="pg"
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_DATABASE="etherna"
DB_USER="root"
DB_PASSWORD="root"
DB_SSL="false"
```

Change the email settings in .env file. You can use a custom sendgrid api key:

```toml
EMAIL_FROM="noreply@example.com"
EMAIL_SMTP_PASSWORD="SG.xxxxxxxxxxxxxx"
```

Change the bootstrap user in .env file (optional):

```toml
ADMIN_EMAIL="admin@me.com"
ADMIN_PASSWORD="admin"
```
