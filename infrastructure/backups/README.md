# Backups

## Strategy (planned)

- **PostgreSQL**: Daily dumps of `pinkshots` database
- **Retention**: 7 daily, 4 weekly
- **Storage**: Off-VM or S3-compatible bucket

## Restore (example)

```bash
psql -U pinkshots -d pinkshots < backup.sql
```

*Do not commit secrets or backup paths to the repo.*
