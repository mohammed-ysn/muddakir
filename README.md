# Muddakir

Quran memorisation tracker.

## Getting Started

```bash
# Start development environment
docker-compose up

# Run CLI commands
docker-compose exec app npx ts-node src/index.ts --help

# Stop
docker-compose down
```

## Data Location

- **Database:** `data/muddakir.db` (SQLite)
- **Config:** `.env`

Database persists across container restarts via volume mount.

## Prisma Commands

```bash
# Generate Prisma client
docker-compose exec app npm run prisma:generate

# Create migration
docker-compose exec app npm run prisma:migrate

# Open Prisma Studio
docker-compose exec app npm run prisma:studio
```