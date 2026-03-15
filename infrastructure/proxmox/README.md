# Proxmox VM

## VM setup

- **OS**: Ubuntu 22.04 LTS
- **Resources**: 2 vCPU, 4 GB RAM (adjust for load)
- **Storage**: 20 GB+ for OS + Docker images
- **Network**: Bridge or static IP

## Post-install

```bash
# Docker + Docker Compose
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

## Hostnames

Document hostnames and IPs here (no secrets). Example: `pinkshots-vm.local`.
