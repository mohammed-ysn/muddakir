# Muddakir

Quran memorisation tracker.

## Installation

```bash
# Build the Docker image
docker build -t muddakir .

# Install CLI wrapper globally
sudo cp muddakir.sh /usr/local/bin/muddakir
sudo chmod +x /usr/local/bin/muddakir
```

## Usage

```bash
# Run from anywhere
muddakir --help
```

## Data Location

- **Database:** `~/.muddakir/muddakir.db` (SQLite)
- Data persists in your home directory
- Can be customised with `MUDDAKIR_DATA` environment variable

## Development

```bash
# Start development environment
docker-compose up

# Run CLI commands in dev
docker-compose exec app npx ts-node src/index.ts --help

# Stop
docker-compose down
```

### Prisma Commands (Development)

```bash
# Generate Prisma client
docker-compose exec app npm run prisma:generate

# Create migration
docker-compose exec app npm run prisma:migrate

# Open Prisma Studio
docker-compose exec app npm run prisma:studio
```